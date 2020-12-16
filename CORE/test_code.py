import os
import requests
import json

from gamemanager import GameManager
from util.userprogram import UserProgram

def load_user_code(test_data, test_dir):
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    # load code
    code_filename = 'challenger.py'
    code_path = os.path.join(test_dir, code_filename)
    code = test_data['challenger_code']

    with open(code_path, 'w') as f:
        f.write(code)

    return code_filename

def data_formatting(test_data, test_dir, code_filename):
    challenger = UserProgram('challenger', test_data['challenger'], test_data['challenger_language'], test_dir,
                             code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=challenger,
                               rule=test_data['rule'],
                               board_size=test_data['board_size'], board_info=test_data['board_info'],
                               problem=json_data['problem'])

    return game_manager

def patch_to_api(result):

    available = False
    status = 'OK'

    if result == 'finish':
        available = True
    print(f'patch to :{update_url}')

    # patch available
    r = requests.patch(update_url, data={"available_game": available, "status": status})

def test_code(data, update_url):
    """
    Function to test code for execution
    :param data: code data
    :type data: dict
    """
    test_data = data
    test_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')
    update_url = 'http://localhost:8000/api/v1/code/' + str(test_data['code_id']) + '/'

    code_filename = load_user_code(test_data, test_dir)

    game_manager = data_formatting(test_data, test_dir, code_filename)

    # test code
    _, _, _, result, _ = game_manager.play_game()
    print('result :', result)

    patch_to_api(result, update_url)

if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    test_code(json_data)