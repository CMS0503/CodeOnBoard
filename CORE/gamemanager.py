import numpy as np
import os

from rule.rules import Rules
from util.game_data import GameData
from util.execute_code import Execution
from util.placement_data import PlacementData


def test():
    print('test')


class GameManager:

    def __init__(self, challenger, oppositer, rule, board_size, board_info, problem):
        self.board = np.zeros((board_size, board_size), dtype='i')
        self.board_info = board_info
        self.board_size = board_size
        self.board_record = ''

        # self.board = board_info
        self.turn = 1
        self.challenger = challenger
        self.opposite = oppositer

        self.game_data = GameData(rule, board_size, board_info, problem)
        self.rules = Rules()

        self.execution = Execution()

        self.placement_record = ''

        self.limit_time = 2000
        self.limit_turn = 100

        self.error_msg = None

        self.mode = 0

    def setting(self):
        self.board_record += " ".join(self.board_info.splitlines()) + ' \n'
        self.board = self.parsing_board_info(self.board_info, self.board_size)
        self.compile_user_code()

        self.playing = True
        self.self.total_turn = 0
        self.winner = 0

    def play_game(self):
        """
        Function for play game

        :return: winner, board record, placement record, match result, error msg
        :rtype: int, str, str, str, str
        """
        self.setting()

        print('###### Start Game ######')
        while self.playing:
            if self.turn_over(self.total_turn):
                return self.match_result

            try:
                self.set_game_data()
            except:
                break

            self.post_gaming(placement)

            # Check Rule
            self.error_msg, self.board, self.playing, self.winner = self.rules.check_rule(self.game_data, self.placement_data)

        # End game
        self.winner, self.match_result = self.end_game()

        return self.winner, self.board_record, self.placement_record, self.match_result, self.error_msg

    def play_with_me(self, placement):
        """
        Function for play with me

        :param placement: user placement
        :type placement: int
        :return: match_result, winner, board record, placement
        :rtype: str, int, str, str
        """
        print('Start Play With Me')
        self.setting()

        print('Start Check Rule...')
        for i in range(2):
            self.make_board_data()

            # Execute user code
            if i == 1:  # code turn
                placement = self.execute_user_program()

            # Start Check Rule
            placement_data = PlacementData(placement, self.board)

            self.error_msg, self.board, self.playing, self.winner = self.rules.check_rule(self.game_data, placement_data)

            self.update_board_record(i)

            # End game
            if not self.playing:
                if self.winner == 0:
                    self.add_data(self.board, placement)
                break

            elif self.playing:
                self.turn *= -1
                self.board *= -1

        # End game with error
        self.winner, self.match_result = self.end_game()

        return self.match_result, self.winner, self.board_record, placement

    def post_gaming(self, placement):
        # Add placement record
        self.add_record(placement)

        # change turn
        if self.playing:
            self.change_turn()

    def update_board_record(self, i):
        if i == 0:
            print('# After user action board')
            print(self.board)
            self.add_data(self.board, placement)
        else:
            self.add_data(self.board * (-1), placement)
            print('# After Code action board')
            print(self.board * (-1))

    def set_game_data(self):
        self.make_board_data()

        # Execute user code
        print('Execute user program...', end='')
        try:
            placement = self.execute_user_program()
        except:
            raise

        # Make placement data
        self.placement_data = PlacementData(placement, self.board)

    def change_turn(self):
        self.total_turn += 1
        self.turn = -1 if self.turn == 1 else 1

    def execute_user_program(self):
        try:
            if self.turn == 1:
                command = self.challenger.play()
            elif self.turn == -1:
                command = self.opposite.play()
            placement = self.execution.execute_program(command, self.challenger.save_path)
            return placement
        except Exception as e:
            self.error_msg = e
            raise


    def turn_over(self, turn):
        """
        check total turn over
        :param turn: current total turn
        :type turn: int
        :return:
        :rtype:
        """
        if turn > self.limit_turn:
            print('turn over')
            self.error_msg = 'total turn over'
            self.match_result = 'draw'
            return True

    def end_game(self):
        """
        If game is end decide winner

        :return: winner, match result
        :rtype: int, str
        """
        if self.error_msg == 'no error':
            print('End Game')
            self.winner *= -1 if self.turn == -1 else self.winner
            self.match_result = 'finish'
        else:
            print('End with error')
            if self.turn == 1:
                self.winner = -1
                self.match_result = 'challenger_error'
            else:
                self.winner = 1
                self.match_result = 'opposite_error'

            if placement == '':
                print('no placement')
                if self.error_msg != 'Time Over':
                    self.error_msg = 'RunTimeError'
            else:
                self.error_msg = str(self.error_msg) + f'--> placement = {placement}'

        return self.winner, self.match_result

    def compile_user_code(self):
        """
        Function for compile user code
        """
        try:
            self.execution.execute_program(self.challenger.compile(), self.challenger.save_path)
        except KeyError as e:
            return False

        try:
            self.execution.execute_program(self.opposite.compile(), self.opposite.save_path)
        except KeyError as e:
            return False
        print('compile...')
        return True

    def add_data(self, board, placement):
        """
        Function for add data

        :param board: current board
        :type board: list of int
        :param placement: user placement
        :type placement: int
        """
        self.placement_record += str(placement).strip() + '\n'

        for line in board:
            for i in line:
                self.board_record += (str(i) + ' ')

        self.board_record += '\n'

    def make_board_data(self):
        """
        Read board data file
        """
        with open(os.path.join(self.challenger.save_path, 'board.txt'), 'w') as f:
            temp = ''
            for line in self.board:
                for i in line:
                    temp += (str(i) + ' ')
                temp += '\n'
            f.write(temp)

    def add_record(self, placement):
        """
        Function for add record

        :param placement: user placement
        :type placement: int
        """
        if self.turn == 0:
            self.add_data(self.board, placement)
            self.board *= -1

        else:
            self.board *= -1
            self.add_data(self.board, placement)

    def parsing_board_info(self, board_info, board_size):
        """
        Parsing board info string to list

        :param board_info: current board
        :type board_info: str
        :param board_size: board size
        :type board_size: int
        :return: board
        :rtype: list of int
        """
        numbers = board_info.split()
        board = np.zeros((board_size, board_size), dtype='i')
        for i in range(board_size):
            for j in range(board_size):
                board[i][j] = int(numbers[i * board_size + j])

        return board
