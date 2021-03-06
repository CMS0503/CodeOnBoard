import json
import os


class UserProgram:
    def __init__(self, user, user_idx, language, save_path, filename):
        self.user = user
        self.index = user_idx
        self.language = language
        self.save_path = save_path
        self.input_path = os.path.join(self.save_path, 'board.txt')
        self.file_path = os.path.join(self.save_path, filename)
        self.excute_path = os.path.join(self.save_path, self.user)
        self.output_path = os.path.join(self.save_path, 'placement.txt')

    def compile(self):
        """
        Return compile message
        :return: compile message
        :rtype: str
        """

        compile_message = {'C': ['/usr/bin/gcc', '/usr/bin/gcc', '-o'],
                           'C++': ['/usr/bin/g++', '/usr/bin/g++', '-o']}

        if 'PYTHON' not in self.language:
            compile_message[self.language].append(self.user)
            compile_message[self.language].append(self.file_path)

        return compile_message[self.language]

    def play(self):
        """
        Return execute command
        :return: execute command
        :rtype: str
        """

        play_message = {'PYTHON': ['/usr/bin/python3', 'python3', self.file_path, '<', self.input_path],
                        'C': [self.excute_path, self.excute_path, '<', self.input_path],
                        'C++': [self.excute_path, self.excute_path, '<', self.input_path]}

        return play_message[self.language]
