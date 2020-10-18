import django_filters

from onepanman_api.serializers import CodeSerializer
from rest_framework import viewsets

from onepanman_api.models import Game, Code
from onepanman_api.serializers.game import GameSerializer

from rest_framework.response import Response

from rest_framework.views import APIView

from django.db.models import Q

from onepanman_api.permissions import UserReadOnly

from onepanman_api.permissions import game
from onepanman_api.util.getIp import get_client_ip

from onepanman_api.models import Problem


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    filter_backends = (django_filters.rest_framework.DjangoFilterBackend,)
    filter_fields = ('challenger_code', 'opposite_code',)

    permission_classes = [game]

    def game_error(self, data, partial):
        queryset = Code.objects.all()

        if result == "challenger_error":
            error_code = queryset.filter(id=data["challenger_code"])[0]
        else:
            error_code = queryset.filter(id=data["opposite_code"])[0]

        try:
            # update code to not available to game
            code_data = {
                "available_game": False,
            }

            code_serializer = CodeSerializer(error_code, data=code_data, partial=partial)
            code_serializer.is_valid(raise_exception=True)
            code_serializer.save()


        except Exception as e:
            print("game_error - update code error : {}".format(e))

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if game_data.type == "normal":
            update_playing(game_data.challenger.pk, game_data.problem.pk, False)
            update_playing(game_data.opposite.pk, game_data.problem.pk, False)
            return Response(data)

        result = request.data["result"]

        if result == "playing":
            return Response(data)

        if result == "challenger_error" or result == "opposite_error":
            self.game_error(request.data, partial)


        return Response(data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class MyGameView(APIView):

    permission_classes = [UserReadOnly]

    def get(self, request, version):

        queryset = Game.objects.all().select_related('problem').filter(Q(challenger=request.user.pk) | Q(opposite=request.user.pk))
        serializer = GameSerializer(queryset, many=True)

        problems = Problem.objects.all()
        data = serializer.data

        for i in range(len(data)):

            problemid = data[i]['problem']
            problem = problems.filter(id=problemid)[0]
            data[i]['title'] = problem.title

        return Response(serializer.data[-50:])
