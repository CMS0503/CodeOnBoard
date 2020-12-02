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
        self.game_data = game_data
        self.board = np.array(placement_data.board)

        self.rule = 1  # game_data.ending_rule
        self.type = game_data.rule[int(placement_data.obj_number) - 1]["type"]

    def check_ending(self, game_data, placement_data):
        self.set(game_data, placement_data)
        # if game_data.problem in (1, 2):
        self.check_available_place()
        if self.is_ending is True:
            self.count_stone()
            return self.is_ending, self.winner

        for function in self.base_ending_rule:
            function()
            if self.is_ending is True:
                self.count_stone()
                return self.is_ending, self.winner

        return self.is_ending, 0


    # 보드판을 가득 채웠을 경우
    def full_board(self):
        if np.any(self.board == 0) is False:
            self.is_ending = True

    def only_one_side(self):
        if np.any(self.board < 0) is False:
            self.is_ending = True

    # option
    def one_line_num(self):
        pass

    def check_range(self, x, y):
        if (0 <= x < len(self.board)) and (0 <= y < len(self.board)):
            return False
        else:
            return True
    
    def check_available_place(self):
        poss = []
        poss2 = []
        for x, line in enumerate(self.board):
            for y, i in enumerate(line):
                if i < 0:
                    poss.append((x, y))
                    poss2.append((x, y))
        available = None
        available2 = None
        if self.type == 'add':
            _, _, available = self.get_stones(poss, 0, 0)
            print('available', available)
        else:
            _, _, available = self.get_stones(poss, 0, 0)
            _, _, available2 = self.get_stones(poss2, 0, 1)
            print('available2', available2)

        if available or available2:
            pass
        else:
            self.is_ending = True

    def get_stones(self, poss, whose, space):
        # if space == 1:
        #     print('my poss', poss)
        eight_dir_poss = []
        pos_r = None
        result = None
        x_list = []
        y_list = []
        if space == 0:
            x_list = y_list = [-1, 0, 1]
        elif space == 1:
            x_list = y_list = [-2, -1, 0, 1, 2]
        while not eight_dir_poss:
            if not poss:
                break
            pos = random.choice(poss)
            poss.remove(pos)
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
                    # if space == 1:
                    #     print(pos, (next_x, next_y))
                    if next_x > 7 or next_x < 0 or next_y > 7 or next_y < 0:
                        continue
                    if whose == 0:
                        if self.board[next_x][next_y] == 0:
                            # print(1,pos,next_x, next_y)
                            # print(self.board)
                            eight_dir_poss.append((next_x, next_y))
                            result = True
                    elif whose == 1:
                        if self.board[next_x][next_y] > 0:
                            # print(2,self.board[next_x][next_y])
                            eight_dir_poss.append((next_x, next_y))
                            result = True
                    elif whose == -1:
                        if self.board[next_x][next_y] < 0:
                            # print(3,self.board[next_x][next_y])
                            eight_dir_poss.append((next_x, next_y))
                            result = True
            pos_r = pos
        return result, pos_r, eight_dir_poss

    def count_stone(self):
        if (self.board > 0).sum() > (self.board < 0).sum():
            self.winner = 1
        elif (self.board > 0).sum() < (self.board < 0).sum():
            self.winner = -1
        else:
            self.winner = 0

