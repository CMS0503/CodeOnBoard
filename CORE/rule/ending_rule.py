# -*- coding: utf-8 -*-
import numpy as np
import random


class EndingRule:

    def __init__(self):
        self.ending_message = False
        self.base_ending_rule = [self.full_board, self.only_one_side]
        self.ending_condition_list = {0: self.nothing, 1: self.one_line}
        self.ending_option_list = [self.one_line_num, self.check_available_place]
        self.placement_type = None

        self.winner = None
        self.is_ending = False

        self.board = None
        self.game_data = None

        self.rule_list = []

        self.rule = None
        self.ending_option = None

        self.flag = True
        self.type = None

    def nothing(self):
        pass

    def set(self, game_data, placement_data):
        """
        Data setting

        """
        self.game_data = game_data
        self.board = np.array(placement_data.board)

        self.rule = 1  # game_data.ending_rule
        self.type = game_data.rule[int(placement_data.obj_number) - 1]["type"]

    def check_ending(self, game_data, placement_data):
        """
        Check game is ending

        :param game_data: rule data
        :param placement_data: user placement, current board
        :return: is ending, winner
        :rtype: bool, int
        """

        self.set(game_data, placement_data)

        self.check_available_place()

        if self.is_ending:
            self.count_stone()
            return self.is_ending, self.winner

        for function in self.base_ending_rule:
            function()
            if self.is_ending:
                self.count_stone()
                return self.is_ending, self.winner

        return self.is_ending, 0

    def full_board(self):
        """
        Check board is full
        """

        self.is_ending = not np.any(self.board == 0)

    def only_one_side(self):
        """
        Check there is only one user stone on board
        """

        self.is_ending = not np.any(self.board < 0)

    def check_range(self, x, y):
        """
        Check x,y in board range

        :param x: placement x
        :type x: int
        :param y: placement y
        :type y: int
        :rtype: bool
        """

        return (0 <= x < len(self.board)) and (0 <= y < len(self.board))
    
    def check_available_place(self):
        """
        Check if there is a available placement position
        
        :return: available placement position
        :rtype: bool
        """
        
        pos = []
        pos2 = []
        for x, line in enumerate(self.board):
            for y, i in enumerate(line):
                if i < 0:
                    pos.append((x, y))
                    pos2.append((x, y))

        available = None
        available2 = None

        # available position for each rule type
        if self.type == 'add':
            _, available = self.get_stones(pos, 0, 0)
            print('available', available)
        else:
            _, available = self.get_stones(pos, 0, 0)
            _, available2 = self.get_stones(pos2, 0, 1)
            print('available2', available2)

        if not (available or available2):
            self.is_ending = True

    def get_stones(self, pos, whose, space):
        """
        get available placement position
        
        :param pos: user's stones in board
        :type pos: list of tuple
        :param whose: num of user to get position
        :type whose: int
        :param space: distance of move
        :type space: int
        :return: result, available position
        :rtype: bool, list of tuple
        """

        eight_dir_pos = []
        result = None
        x_list = []
        y_list = []
        if space == 0:
            x_list = y_list = [-1, 0, 1]
        elif space == 1:
            x_list = y_list = [-2, -1, 0, 1, 2]
        while not eight_dir_pos:
            if not pos:
                break
            pos = random.choice(pos)
            pos.remove(pos)
            for x in x_list:
                for y in y_list:
                    if space == 0:
                        if x == 0 and y == 0:
                            continue
                    elif space == 1:
                        if abs(x) <= 1 and abs(y) <= 1:
                            continue
                    next_x = pos[0] + x
                    next_y = pos[1] + y
                    if next_x > 7 or next_x < 0 or next_y > 7 or next_y < 0:
                        continue
                    if whose == 0:
                        if self.board[next_x][next_y] == 0:
                            # print(1,pos,next_x, next_y)
                            # print(self.board)
                            eight_dir_pos.append((next_x, next_y))
                            result = True
                    elif whose == 1:
                        if self.board[next_x][next_y] > 0:
                            # print(2,self.board[next_x][next_y])
                            eight_dir_pos.append((next_x, next_y))
                            result = True
                    elif whose == -1:
                        if self.board[next_x][next_y] < 0:
                            # print(3,self.board[next_x][next_y])
                            eight_dir_pos.append((next_x, next_y))
                            result = True

        return result, eight_dir_pos

    def count_stone(self):
        """
        Count both user stones to check winner
        """

        if (self.board > 0).sum() > (self.board < 0).sum():
            self.winner = 1
        elif (self.board > 0).sum() < (self.board < 0).sum():
            self.winner = -1
        else:
            self.winner = 0

