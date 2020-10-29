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

    # permission_classes = [game]

    def game_error(self, data):
        queryset = Code.objects.all()

        if data["result"] == "challenger_error":
            error_code = queryset.filter(id=data["challenger_code"])
        else:
            error_code = queryset.filter(id=data["opposite_code"])

        try:
            # update code to not available to game
            error_code.update(available_game=False)

        except Exception as e:
            print("game_error - update code error : {}".format(e))

    def update(self, request, *args, **kwargs):
        data = super().update(request, *args, **kwargs)
        data = data.data

        result = data["result"]

        if result == "challenger_error" or result == "opposite_error":
            self.game_error(data)

        return Response(data)

class MyGameView(APIView):
    # permission_classes = [UserReadOnly]
    def get(self, request, version):
        queryset = Game.objects.all().filter(challenger_code__author__pk=request.user.pk,
                                             challenger_code__problem__id=request.query_params['problem'])
        serializer = GameSerializer(queryset, many=True)

        problems = Problem.objects.all().filter(pk=request.query_params['problem'])
        data = serializer.data
        for i in range(len(data)):
            data[i]['title'] = problems[0].title

        return Response(serializer.data[-50:])
