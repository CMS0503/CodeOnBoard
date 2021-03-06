import os
import json
import requests

from gamemanager import GameManager
from util.userprogram import UserProgram

def load_user_code(match_data, match_dir):
    extension = {'': '', 'C': '.c', 'C++': '.cpp', 'PYTHON': '.py', 'JAVA': '.java'}

    challenger_code_filename = 'challenger{0}'.format(extension[match_data['challenger_language']])
    oppositer_code_filename = 'oppositer{0}'.format(extension[match_data['opposite_language']])

    challenger_code_path = os.path.join(match_dir, challenger_code_filename)
    oppositer_code_path = os.path.join(match_dir, oppositer_code_filename)

    challenger_code = match_data['challenger_code']
    oppositer_code = match_data['opposite_code']

    with open(challenger_code_path, 'w') as f:
        f.write(challenger_code)

    with open(oppositer_code_path, 'w') as f:
        f.write(oppositer_code)

    return challenger_code_filename, oppositer_code_filename


def match_data_formatting(match_data, match_dir, challenger_code_filename, oppositer_code_filename):
    challenger = UserProgram('challenger', match_data['challenger'], match_data['challenger_language'], match_dir,
                             challenger_code_filename)
    oppositer = UserProgram('opposite', match_data['opposite'], match_data['opposite_language'], match_dir,
                            oppositer_code_filename)

    game_manager = GameManager(challenger=challenger, oppositer=oppositer,
                               rule=match_data['rule'],
                               board_size=match_data['board_size'], board_info=match_data['board_info'],
                               problem=json_data['problem'])

    return game_manager


def patch_to_api(data, update_url):
    # patch to api
    print(f'Patch to {update_url}')
    r = requests.patch(update_url, data=data)
    print('request ok')


def match(data):
    match_data = data
    match_dir = os.getcwd()  # os.path.join(os.getcwd(), 'match')

    update_url = 'http://localhost:8000/api/v1/game/' + str(match_data['match_id']) + '/'

    challenger_code_filename, oppositer_code_filename = load_user_code(match_data, match_dir)

    # match data formatting
    game_manager = match_data_formatting(match_data, match_dir,
                                                                challenger_code_filename, oppositer_code_filename)

    # play game
    winner, board_record, placement_record, result, error_msg = game_manager.play_game()

    data = {"winner": winner, "record": board_record, "placement_record": placement_record, "result": result,
            "error_msg": error_msg, "status": "OK"}

    patch_to_api(data, update_url)


if __name__ == '__main__':
    with open('matchdata.json') as json_file:
        json_data = json.load(json_file)
    match(json_data)



