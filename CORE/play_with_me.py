import os
import json
import redis
import time

from gamemanager import GameManager
from util.userprogram import UserProgram


def play_with_me(data):
    json_data = data
    pwm_dir = os.getcwd()

    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    # load user code
    code_filename = 'challenger{0}'.format(extension[json_data['challenger_language']])

    code_path = os.path.join(pwm_dir, code_filename)
    placement_path = os.path.join(pwm_dir, 'placement.txt')

    code = json_data['challenger_code']
    placement = json_data['placement_info']

    with open(code_path, 'w') as f:
        f.write(code)

    with open(placement_path, 'w') as f:
        f.write(placement)

    # match data formatting
    challenger = UserProgram('challenger', json_data['challenger'], json_data['challenger_language'], pwm_dir,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               rule=json_data['rule'],
                               board_size=json_data['board_size'], board_info=json_data['board_info'],
                               problem=json_data['problem'])

    # play game
    result, winner, board_record, placement_code = game_manager.play_with_me(placement)
    host = "localhost"
    r = redis.StrictRedis(host="localhost", port=6379, db=0)

    dict_name = str(json_data['challenger']) + '_' + str(json_data['challenger_code_id'])

    # wait for api
    while r.exists(dict_name) == 1:
        pass

    result_dict = {
        'result': result,
        'winner': winner,
        'board_record': board_record,
        'placement_code': placement_code,
        'time': time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time()))
    }
    print(result_dict)

    # result to json
    json_result_dict = json.dumps(result_dict, ensure_ascii=False).encode('utf-8')

    # save to redis
    r.set(dict_name, json_result_dict)


if __name__ == '__main__':
    with open('testme.json') as json_file:
        json_data = json.load(json_file)
    play_with_me(json_data)