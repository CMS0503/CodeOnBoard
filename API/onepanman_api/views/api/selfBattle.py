import json, redis
import tasks
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from onepanman_api.models import Problem, Code
from django.contrib.auth.models import User

from onepanman_api.permissions import selfBattlePermission


class SelfBattle(APIView):

    # permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        code = Code.objects.all().filter(id=request.data['code'])[0]
        problem = Problem.objects.all().filter(id=request.data['problem'])[0]
        rule = json.loads(problem.rule)
        try:
            matchInfo = {
                "challenger": request.user.pk,
                "opposite": request.user.pk,
                "challenger_code_id": code.id,
                "opposite_code_id": code.id,
                "challenger_code": code.code,
                "opposite_code": code.code,
                "challenger_language": code.language.name,
                "opposite_language": code.language.name,
                "problem": problem.id,
                "rule": rule,
                "board_size": problem.board_size,
                "board_info": request.data['board_info'],
                "placement_info": request.data['placement_info']
            }
        except Exception as e :
            print("matchInfo_Error : {}".format(e))

        try:
            # celery에 넘겨줌
            result = tasks.play_with_me.delay(matchInfo)

            # redis로 받음
            host = "localhost"
            r = redis.StrictRedis(host=host, port=6379, db=0)
            dict_name = str(request.user.pk) + '_' + str(code.id)
            print(dict_name)

            while r.exists(dict_name) == 0:
                pass

            json_dict = r.get(dict_name).decode('utf-8')
            test_dict = dict(json.loads(json_dict))

            # redis에서 삭제
            r.delete(dict_name)

            print(r.exists(dict_name))
        except Exception as e:
            print("redis&celery error : {}".format(e))

        return Response(test_dict, status=status.HTTP_200_OK)
