import os
import requests
import json

from gamemanager import GameManager
from util.userprogram import UserProgram


def test_code(data):
    """
    Function to test code for execution
    :param data: code data
    :type data: dict
    """
    test_data = data
    test_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    update_url = 'http://localhost:8000/api/v1/code/' + str(test_data['code_id']) + '/'

    # load code
    code_filename = 'challenger.py'
    code_path = os.path.join(test_dir, code_filename)
    code = test_data['challenger_code']

    with open(code_path, 'w') as f:
        f.write(code)

    # data formatting
    challenger = UserProgram('challenger', test_data['challenger'], test_data['challenger_language'], test_dir,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               rule=test_data['rule'],
                               board_size=test_data['board_size'], board_info=test_data['board_info'],
                               problem=json_data['problem'])

    # test code
    _, _, _, result, _ = game_manager.play_game()
    print('result :', result)

    available = False
    status = 'OK'

    if result == 'finish':
        available = True
    print(f'patch to :{update_url}')

    # patch available
    r = requests.patch(update_url, data={"available_game": available, "status": status})

if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    test_code(json_data)