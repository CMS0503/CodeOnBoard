import json

from onepanman_api import serializers
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from onepanman_api.models import Problem, Game, Code

from onepanman_api.serializers.code import CodeSerializer
import random
import tasks


class GetCoreResponse(Response):
    def close(self):
        matchInfo = self.data

        # uiip objects playing...
        challenger = matchInfo["challenger"]
        opposite = matchInfo["opposite"]
        problemid = matchInfo["problem"]
        status = True

        update_playing(challenger, problemid, status)
        update_playing(opposite, problemid, status)

        Code.objects.all().filter(id=matchInfo["challenger_code_id"]).update(status="playing")
        Code.objects.all().filter(id=matchInfo["opposite_code_id"]).update(status="playing")

        # 여기에 celery 호출하는 코드!
        result = tasks.play_game.delay(matchInfo)




class Match(APIView):
    permission_classes = [IsAuthenticated]

    # 유저와 문제정보로 상대방을 매칭하고, 매칭 정보를 반환하는 함수
    def match(self, chllenger_id, problem_id, challenger_code_id):
        queryset = Code.objects.all().filter(problem=problem_id, available_game=True).order_by('id')
        challenger_code = queryset.filter(author=chllenger_id).last()

        # 유저가 게임중이면
        if challenger_code.status == 'playing':
            error_msg = '유저가 게임중입니다'
            print(error_msg)
            return False, error_msg

        # 게임을 진행할 코드가 없으면
        if len(queryset) < 1:
            return {"error": "게임을 진행할 코드가 없습니다."}, 0

        # 같은 유저와 연속 매칭 막기
        games = Game.objects.all().filter(challenger=chllenger_id, problem=problem_id).order_by('-date')
        if len(games) > 0:
            ex_opposite_id = games[0].opposite.pk
        else:
            # 첫번째 매칭이면 전판 유저가 없다.
            ex_opposite_id = 0

        queryset_opposites_code = queryset.exclude(author=chllenger_id)
        queryset_opposites = list(queryset_opposites_code.values_list('author', flat=True).distinct().order_by())
        # opposites = [i for i in range(N)]

        while True:
            try:
                opposite_id = queryset_opposites.pop(random.randrange(len(queryset_opposites)))
            except Exception as e:
                print("매칭 상대가 없습니다.")
                return 'error : 매칭 상대가 없습니다.'
            opposite_code = queryset_opposites_code.filter(author=opposite_id).order_by('id').last()
            # 상대가 게임중이면
            if opposite_code.status == 'playing':
                continue
            if opposite_id != ex_opposite_id:
                break

        # 문제 규칙 정보 추가
        problems = Problem.objects.all().filter(id=problem_id)
        problem = problems[0]

        try:
            rule = problem.rule
            rule = json.loads(rule)

        except Exception as e:
            print("fail to read rule information : {}".format(e))
            return {'error': 'rule 정보 가져오기 에러'}, 0


        matchInfo = {
            "challenger": chllenger_id,
            "opposite": opposite_id,
            "challenger_code_id": challenger_code_id,
            "opposite_code_id": opposite_code.id,
            "challenger_code": challenger_code.code,
            "opposite_code": opposite_code.code,
            "challenger_language": challenger_code.language.name,
            "opposite_language": opposite_code.language.name,
            "problem": int(problem_id),
            "obj_num": rule["obj_num"],
            "placement": rule["placement"],
            "action": rule["action"],
            "ending": rule["ending"],
            "board_size": problem.board_size,
            "board_info": problem.board_info,
            "challenger_name": challenger_code.author.username,
            "opposite_name": opposite_code.author.username
        }

        #print(matchInfo)

        return matchInfo

    # 게임에 사용될 인스턴스를 만들고, 그 id를 반환하는 함수
    def get_GameId(self, info, type="normal"):
        try:
            matchInfo = info

            data = {
                "problem": matchInfo['problem'],
                "challenger": matchInfo['challenger'],
                "opposite": matchInfo['opposite'],
                "challenger_code": matchInfo['challenger_code_id'],
                "opposite_code": matchInfo['opposite_code_id'],
                "record": "0",
                "challenger_name": matchInfo['challenger_name'],
                "opposite_name": matchInfo['opposite_name'],
                "type": type
            }

            serializer = serializers.GameSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            validated_data = serializer.validated_data

            print(validated_data)

            instance = Game.objects.create(
                problem=validated_data['problem'],
                challenger=validated_data['challenger'],
                opposite=validated_data['opposite'],
                challenger_code=validated_data['challenger_code'],
                opposite_code=validated_data['opposite_code'],
                record=validated_data['record'],
                challenger_name=validated_data['challenger_name'],
                opposite_name=validated_data['opposite_name'],
                type=validated_data['type']
            )

        except Exception as e:
            print("game data 생성 중 에러 발생 : {}".format(e))
            return {'error': 'game 생성 error'}

        game_id = instance.id

        matchInfo['match_id'] = game_id

        return matchInfo

    def post(self, request, version):
        try:

            data = request.data

            chllenger_id = data['userid']
            problem_id = data['problemid']
            code_id = data['codeid']

        except Exception as e:
            print("get function {}".format(e))
            return Response({"error": "유저, 문제, 코드 정보 가 유효하지 않습니다."}, status=status.HTTP_400_BAD_REQUEST)

        matchInfo = self.match(chllenger_id, problem_id, code_id)

        if "error" in matchInfo:
            return Response(matchInfo)

        matchInfo = self.get_GameId(matchInfo, scores)

        if "error" in matchInfo:
            return Response(matchInfo)

        return GetCoreResponse(matchInfo)








