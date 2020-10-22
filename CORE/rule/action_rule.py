# -*- coding: utf-8 -*-
import numpy as np


class ActionRule:

    def __init__(self):
        self.action_message = None
        self.rule_condition = {0: self.nothing, 1: self.adjacent}
        self.rule_direction = {0: self.nothing, 1: self.width, 2: self.height, 3: self.cross, 4: self.diagonal, 5: self.eight_dir}
        self.rule_method = {0: self.nothing, 1: self.reverse, 2: self.remove}

        self.game_data = None
        self.board = None

        self.curr_x = None
        self.curr_y = None
        self.next_x = None
        self.next_y = None
        self.obj_number = None

        self.rule = None
        self.condition = None
        self.dir = None
        self.method = None

        self.rule_list = []
        self.dir_list = []
        self.stone_list = []

    def nothing(self):
        pass

    def apply_action_rule(self, game_data, placement_data):
        self.setting(game_data, placement_data)

        self.method()

        return 'OK', self.board

    def setting(self, game_data, placement_data):
        self.game_data = game_data
        self.board = placement_data.board

        self.curr_x = placement_data.curr_x
        self.curr_y = placement_data.curr_y
        self.next_x = placement_data.next_x
        self.next_y = placement_data.next_y
        self.obj_number = placement_data.obj_number

        self.rule = game_data.action_rule[placement_data.obj_number]
        self.condition = self.rule_condition[self.rule[0]]
        self.dir = self.rule_direction[self.rule[1]]
        self.method = self.rule_method[self.rule[2]]

    # condition
    def surround(self):
        pass

    def adjacent(self):
        self.dir()
        poses = []
        for d in self.dir_list:
            x = self.next_x + d[0]
            y = self.next_y + d[1]
            if self.check_range(x, y):
                continue
            poses.append((x, y))
        return poses

    # direction
    def width(self):
        self.dir_list = [(0, 1), (0, -1)]

    def height(self):
        self.dir_list = [(1, 0), (-1, 0)]

    def cross(self):
        self.dir_list = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    def diagonal(self):
        self.dir_list = [(-1, 1), (1, 1), (1, -1), (-1, -1)]

    def eight_dir(self):
        self.dir_list = [(0, 1), (1, 0), (0, -1), (-1, 0), (-1, 1), (1, 1), (1, -1), (-1, -1)]

    def reverse(self):
        poses = self.adjacent()
        for pos in poses:
            if self.board[pos[0]][pos[1]] < 0:
                self.board[pos[0]][pos[1]] *= -1

    def remove(self):
        pass
        # if self.board[self.x][self.y] < 0:
        #     self.board[self.x1][self.y1] = 0
        #     self.board[self.x][self.y] = self.obj_number

    def check_range(self, x, y):
        if (0 <= x < len(self.board)) and (0 <= y < len(self.board)):
            return False
        else:
            return True
