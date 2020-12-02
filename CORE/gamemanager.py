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

    def play_game(self):
        print('###### Start Game ######')
        total_turn = 0
        is_ending = False
        match_result = ''
        winner = 0
        self.board_record += " ".join(self.board_info.splitlines()) + ' \n'
        self.board = self.parsing_board_info(self.board_info, self.board_size)
        self.compile_user_code()

        while not is_ending:
            print('## turn start ##')
            if self.turn_over(total_turn):
                self.error_msg = 'total turn over'
                match_result = 'draw'
                return match_result

            self.make_board_data()

            # Execute user code
            placement = None
            print('Execute user program...', end='')
            try:
                # if os.path.isfile("placement.txt"):
                #     pass
                #     os.remove("placement.txt")
                if self.turn == 1:
                    placement = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                elif self.turn == -1:
                    placement = self.execution.execute_program(self.opposite.play(), self.opposite.save_path)
            except Exception as e:
                self.error_msg = e
                break
            print('OK')
            print('placement :', placement, end='')

            print('Turn :', self.turn)
            print(self.board)

            # Make placement data
            placement_data = PlacementData(placement, self.board)

            # Start check placement rule
            print('Check placement rule...', end='')
            try:
                check_placement, new_board = self.rules.check_placement_rule(self.game_data, placement_data)
            except Exception as e:
                self.error_msg = f'Error in check placement rule : {e}'
                break
            print(check_placement)

            # Check Action Rule
            self.board = new_board
            print('Check action rule...', end='')
            try:
                apply_action, new_board = self.rules.apply_action_rule(self.game_data, placement_data)
            except Exception as e:
                self.error_msg = f'Error in check action rule : {e}'
                break
            print(apply_action)

            # Check Ending Rule
            self.board = new_board
            print('Check ending rule...', end='')
            try:
                is_ending, winner = self.rules.check_ending(self.game_data, placement_data)
            except Exception as e:
                self.error_msg = f'Error check ending rule : {e}'
                break

            # Add placement record
            self.add_record(placement)

            # End game
            if is_ending:
                self.error_msg = 'no error'
                break
            # change turn
            else:
                total_turn += 1
                self.turn = -1 if self.turn == 1 else 1

        # End game
        winner, match_result = self.end_game(winner)

        print(self.error_msg)

        return winner, self.board_record, self.placement_record, match_result, self.error_msg

    def play_with_me(self, placement):
        print('Start Play With Me')
        self.board = self.parsing_board_info(self.board_info, self.board_size)
        self.compile_user_code()

        is_ending = False

        match_result = 'not finish'
        print('Start Check Rule...')
        for i in range(2):
            print('\n' + '#######')
            self.make_board_data()

            if i == 0:
                print('Receive Borad')
                print(self.board)

            # Execute user code
            if i == 1:  # only code turn
                try:
                    print('Execute user program...', end='')
                    # if os.path.isfile("placement.txt"):
                    #     os.remove("placement.txt")
                    placement = self.execution.execute_program(self.challenger.play(), self.challenger.save_path)
                except Exception as e:
                    self.error_msg = f'Program error in execute user program : {e}'
                    print(self.error_msg)
                    break
            else:
                print('User placement:', placement, '...', end='')
            print('OK', placement)
            # Start Check Rule

            placement_data = PlacementData(placement, self.board)
            # Check Placement Rule
            print('Check Placement Rule...', end='')
            try:
                check_placement, new_board = self.rules.check_placement_rule(self.game_data, placement_data)
            except Exception as e:
                self.error_msg = f'placement error : {e}'
                print(self.error_msg)
                break
            print(check_placement)

            # After placement board
            self.board = new_board

            # Check Action Rule
            print('Check action rule...', end='')
            try:
                apply_action, new_board = self.rules.apply_action_rule(self.game_data, placement_data)
            except Exception as e:
                self.error_msg = f'action error : {e}'
                print(self.error_msg)
                break
            print(apply_action, new_board)

            # After action board
            self.board = new_board

            # Check Ending Rule
            print('Check ending rule...', end='')
            try:
                is_ending, winner = self.rules.check_ending(self.game_data, placement_data)
            except Exception as e:
                print('errrrrrrrrror')
                self.error_msg = f'ending error : {e}'
                print(self.error_msg)
                break
            print(is_ending, '\n')

            if i == 0:
                print('# After user action board')
                print(self.board)
                self.add_data(self.board, placement)

            else:
                self.add_data(self.board * (-1), placement)
                print('# After Code action board')
                print(self.board * (-1))

            # End game
            if is_ending:
                print('End Game', winner)
                if winner == 1:
                    winner = self.turn
                elif winner == -1:
                    if self.turn == 0:
                        winner = 1
                    else:
                        winner = 0
                else:
                    winner = 'draw'
                match_result = 'finish'
                self.error_msg = 'no error'
                if winner == 0:
                    self.add_data(self.board, placement)
                break

            elif not is_ending:
                self.turn = 0 if self.turn == 1 else 1
                self.board *= -1

        # End game with error
        if self.error_msg != 'no error' and self.error_msg is not None:
            print('End error', str(self.error_msg))
            if self.turn == 0:
                winner = 1
                match_result = 'challenger_error'
            else:
                winner = 0
                match_result = 'opposite_error'

            if placement is not None:
                self.error_msg = str(self.error_msg) + f'--> placement = {placement}'

        print('winner', winner)
        print(self.board_record)
        return match_result, winner, self.board_record, placement

    def turn_over(self, turn):
        if turn > self.limit_turn:
            print('turn over')
            return True

    def end_game(self, winner):
        if self.error_msg == 'no error':
            print('End Game')
            winner *= -1 if self.turn == -1 else winner
            match_result = 'finish'
        else:
            print('End with error')
            if self.turn == 1:
                winner = -1
                match_result = 'challenger_error'
            else:
                winner = 1
                match_result = 'opposite_error'

            if placement == '':
                print('no placement')
                if self.error_msg != 'Time Over':
                    self.error_msg = 'RunTimeError'
            else:
                self.error_msg = str(self.error_msg) + f'--> placement = {placement}'

        return winner, match_result

    def compile_user_code(self):
        try:
            self.execution.execute_program(self.challenger.compile(), self.challenger.save_path)
        except KeyError as e:
            return False

        try:
            self.execution.execute_program(self.opposite.compile(), self.opposite.save_path)
        except KeyError as e:
            return False
        print('compile')
        return True

    def add_data(self, board, output):
        self.placement_record += str(output).strip() + '\n'

        for line in board:
            for i in line:
                self.board_record += (str(i) + ' ')

        self.board_record += '\n'

    def make_board_data(self):
        with open(os.path.join(self.challenger.save_path, 'board.txt'), 'w') as f:
            temp = ''
            for line in self.board:
                for i in line:
                    temp += (str(i) + ' ')
                temp += '\n'
            f.write(temp)

    def add_record(self, output):
        if self.turn == 0:
            self.add_data(self.board, output)
            self.board *= -1

        else:
            self.board *= -1
            self.add_data(self.board, output)

    def parsing_user_output(self, output):
        placement = []
        if '>' in output:
            pass
        else:
            placement = [int(i) for i in output.split()]

        return placement

    def parsing_board_info(self, board_info, board_size):
        numbers = board_info.split()
        board = np.zeros((board_size, board_size), dtype='i')
        for i in range(board_size):
            for j in range(board_size):
                board[i][j] = int(numbers[i * board_size + j])

        return board
