import os
import requests
import json

from gamemanager import GameManager
from util.userprogram import UserProgram


def test_code(data):
    test_data = data
    test_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}
    # update_url = 'http://203.246.112.32:8000/api/v1/code/' + str(test_data['code_id']) + '/'
    # update_url = 'http://210.223.124.11:8000/api/v1/code/' + str(test_data['code_id']) + '/'
    update_url = 'http://localhost:8000/api/v1/code/' + str(test_data['code_id']) + '/'
    # code_filename = 'challenger{0}'.format(extension[test_data['challenger_language']])
    code_filename = 'challenger.py'

    code_path = os.path.join(test_dir, code_filename)

    code = test_data['challenger_code']

    with open(code_path, 'w') as f:
        f.write(code)
    challenger = UserProgram('challenger', test_data['challenger'], test_data['challenger_language'], test_dir,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               rule=test_data['rule'],
                               board_size=test_data['board_size'], board_info=test_data['board_info'],
                               problem=json_data['problem'])

    _, _, _, result, _ = game_manager.play_game()
    print('result :', result)
    available = False
    status = 'OK'
    if result == 'finish':
        available = True
    print(f'patch to :{update_url}')
    r = requests.patch(update_url, data={"available_game": available, "status": status})

if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    test_code(json_data)