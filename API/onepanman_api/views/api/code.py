import json

import django_filters
from rest_framework import viewsets, status

from onepanman_api.models import Code
from onepanman_api.serializers.code import CodeSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from onepanman_api.permissions import CodePermission
from onepanman_api.pagination import CodePagination
from onepanman_api.models import Problem

import tasks

from onepanman_api.models import Language


class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('author', 'problem', 'available_game',)

    # permission_classes = [CodePermission]
    # pagination_class = CodePagination

    def create(self, request, *args, **kwargs):
        print('code create')
        # 임시방편
        if type(request.data) == type(dict()):
            request.data['status'] = "TESTING"
        else:
            _mutable = request.data._mutable
            request.data._mutable = True
            request.data['status'] = "TESTING"
            request.data._mutable = _mutable

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        self.test_code(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):

        if 'available_game' in request.data:
            if request.data['available_game'] == "True":
                status = "SUCCESS"
            else:
                status = "FAIL"

            _mutable = request.data._mutable
            request.data._mutable = True
            request.data['status'] = status
            request.data._mutable = _mutable

        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        if 'available_game' not in request.data:
            self.test_code(serializer.data)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        code = self.get_object()
        code.is_delete = True
        code.save()

        serializer = CodeSerializer(code)

        return Response(serializer.data)

    def test_code(self, data):

        problem = Problem.objects.all().filter(id=data["problem"])[0]
        try:
            rule = json.loads(problem.rule)
        except Exception as e:
            print(problem.rule)
        language = Language.objects.all().filter(id=data["language"])[0]
        test_data = {
            "code_id": data['id'],
            "challenger": data['author'],
            "challenger_code": data['code'],
            "challenger_language": language.name,
            "rule": rule,
            "board_size": problem.board_size,
            "board_info": problem.board_info,
            "problem": data["problem"]
        }

        # 여기서 celery 코드 추가!
        tasks.test_code.delay(test_data)

        return


class MyCodeView(APIView):

    permission_classes = [CodePermission]
    # pagination_class = CodePagination

    def get(self, request, version):
        problemid = request.query_params['problem']
        if problemid is None:
            queryset = Code.objects.all().filter(author=request.user.pk, is_delete=False)
        else:
            queryset = Code.objects.all().filter(author=request.user.pk, problem=problemid, is_delete=False)

        serializer = CodeSerializer(queryset, many=True)
        print(">>>>>>>>>", len(queryset))
        for i in range(len(serializer.data)) :
            problem = Problem.objects.all().filter(id=serializer.data[i]['problem'])[0]
            serializer.data[i]['title'] = problem.title

        return Response(serializer.data)
