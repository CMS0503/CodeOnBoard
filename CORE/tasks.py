import docker
import json
import multiprocessing
import time
import os
from celery import Celery

# celery app
app = Celery('tasks', broker='redis://localhost:6379', backend='redis://localhost:6379')

# cpu_info
cpu_num = multiprocessing.cpu_count()


def create_data_file(data, f_dir, file_name):
    """
    Create match data file

    :param data: match data
    :type data: dict
    :param f_dir: folder path
    :type f_dir: str
    :param file_name: file name
    :type file_name: ste
    """

    path = os.path.join(f_dir, file_name)
    with open(path, 'w') as f:
        json.dump(data, f)
    print(f'Create {file_name} in {f_dir}')

@app.task
def play_game(data):
    """
    Function for play game by run docker container

    :param data: match data
    :type data: dict
    """
    print('run container for match')
    # docker setting
    docker_img = "core"
    mode = 'develop'
    client = docker.from_env()

    # create data file
    try:
        f_dir = os.getcwd() + '/match'
        file_name = 'matchdata.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(data['match_id'])
        create_data_file(data, f_dir, file_name)
    except Exception as e:
        print(f'Fail Create matchdata.json file: {e}')

    # share file with docker
    volumes = {match_data_file_path: {'bind': '/matchdata.json', 'mode': 'rw'}}

    # run container
    try:
        if mode == 'develop':
            client.containers.run(image=docker_img, command='python3 match_game.py', volumes=volumes, auto_remove=True,
                                  privileged=True, network_mode='host')
        else:
            client.containers.run(image=docker_img, command='python3 match_game.py', volumes=volumes, auto_remove=True,
                                  privileged=True)
    except Exception as e:
        print(f'Fail run docker container: {e}')


@app.task
def test_code(data):
    """
    Function for test code by run docker container

    :param data: match data
    :type data: dict
    """
    print('run container for test code')
    # docker setting
    mode = 'develop'
    docker_img = "core"
    client = docker.from_env()

    # create data file
    try:
        f_dir = os.getcwd() + '/test_code'
        file_name = 'testdata.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(data['code_id'])
        create_data_file(data, f_dir, file_name)
    except Exception as e:
        print(f'Fail Create test_code.json file: {e}')

    # share file with docker
    volumes = {match_data_file_path: {'bind': '/testdata.json', 'mode': 'rw'}}

    # run docker container
    try:
        if mode == 'develop':
            client.containers.run(image=docker_img, command='python3 test_code.py', volumes=volumes, auto_remove=True,
                                  privileged=True, network_mode='host')
        else:
            client.containers.run(image=docker_img, command='python3 test_code.py', volumes=volumes, auto_remove=True,
                                  privileged=True)
    except Exception as e:
        print(f'Fail run docker container: {e}')

@app.task
def play_with_me(data):
    """
    Function for play with own code by run docker container

    :param data: match data
    :type data: dict
    """
    print('run container for play with me')
    # docker setting
    docker_img = "core"
    client = docker.from_env()

    # create data file
    f_dir = os.getcwd() + '/play_with_me'
    file_name = 'testme.json.' + time.strftime('%m-%d-%H-%M-%S', time.localtime(time.time())) + '_' + str(
        data['challenger'])
    create_data_file(data, f_dir, file_name)

    # share file with docker
    volumes = {match_data_file_path: {'bind': '/testme.json', 'mode': 'rw'}}

    # run docker container
    try:
        client.containers.run(image=docker_img, command='python3 play_with_me.py', volumes=volumes, auto_remove=True,
                              privileged=True, network_mode='host')
    except Exception as e:
        print(f'Fail run docker container: {e}')


if __name__ == '__main__':
    with open('testdata.json') as json_file:
        json_data = json.load(json_file)
    play_with_me(json_data)