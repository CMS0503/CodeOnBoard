from onepanman_api.permissions import ReadAll
from rest_framework import viewsets, status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from . import mixins
from rest_framework.views import APIView
from onepanman_api.models import Code

from onepanman_api import serializers, models, pagination


class ProblemViewSet(mixins.VersionedSchemaMixin,
                     viewsets.ModelViewSet):
    queryset = models.Problem.objects.all()
    lookup_url_kwarg = 'id'
    serializer_class = serializers.ProblemSerializer
    http_method_names = ['get', 'post', 'delete', 'put', 'patch']

    permission_classes = [ReadAll]
    parser_classes = (MultiPartParser, FormParser)

    def list(self, request, *args, **kwargs):
        if request.query_params['my'] == 'true':
            code_queryset = models.Code.objects.all().filter(author=request.user.pk, is_delete=False)\
                .order_by('problem').distinct()
            problems = list(set([code[2] for code in code_queryset.values_list()]))
            queryset = models.Problem.objects.all().filter(id__in=problems, is_delete=False)
        else:
            queryset = models.Problem.objects.all().filter(is_delete=False)
        return self.get_response_list_for(queryset, serializers.ProblemSerializer)

    def retrieve(self, request, *args, **kwargs):
        query = models.Problem.objects.get(id=kwargs['id'])
        return self.get_response_for(query, False, serializers.ProblemSerializer)

    def create(self, request, *args, **kwargs):
        try:
            _mutable = request.data._mutable
            request.data._mutable = True
            request.data['editor'] = request.user.pk
            request.data._mutable = _mutable

            serializer = serializers.ProblemSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data

            instance = models.Problem.objects.create(editor=data['editor'],
                                                     title=data['title'],
                                                     description=data['description'],
                                                     limit_time=data['limit_time'],
                                                     limit_memory=data['limit_memory'],
                                                     thumbnail=data['thumbnail'],
                                                     board_info=data['board_info'],
                                                     rule=data['rule'])

            return self.get_response_for(instance, True, serializers.ProblemSerializer)

        except Exception as e:
            print("problem create error : {}".format(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        try:
            serializer = serializers.ProblemSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            data = serializer.validated_data

            qs = models.Problem.objects.get(id=int(kwargs['id']))
            qs.title = data['title']
            qs.description = data['description']
            qs.limit_time = data['limit_time']
            qs.limit_memory = data['limit_memory']
            qs.thumbnail = data['thumbnail']
            qs.board_size = data['board_size']
            qs.board_info = data['board_info']
            qs.rule = data['rule']
            qs.save()

            return self.get_response_for(qs, False, serializers.ProblemSerializer)

        except Exception as e:
            print("problem update error : {}".format(e))
            return Response(status=status.HTTP_400_BAD_REQUEST)


    def destroy(self, request, *args, **kwargs):
        problem = self.get_object()
        problem.is_delete = True
        problem.save()

        serializer = serializers.ProblemSerializer(problem)

        return Response(serializer.data)

class MyProblemView(APIView):

    # permission_classes = [CodePermission]

    # pagination_class = CodePagination

    def get(self, request, version):
        codes = Code.objects.all().filter(author=request.user.pk).order_by('problem').distinct()
        print(codes.values_list())
        serializer = serializers.CodeSerializer(codes, many=True)

        return Response(serializer.data)