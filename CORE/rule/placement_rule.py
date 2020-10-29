# -*- coding: utf-8 -*-
import numpy as np
from .placement_rule_util import PlacementRuleUtil


class PlacementRule:

    def __init__(self):
        self.util = None
        self.rules = {
            1: self.segyun_add, 2: self.segyun_move,
            3: self.king, 4: self.pawn, 5: self.rook, 6: self.queen, 7: self.knight,
        }

        self.problem_rules = []

    def check_placement_rule(self, game_data, placement_data):
        self.util = PlacementRuleUtil(game_data, placement_data)
        # game type check
        try:
            print('set problem rule...', end='')
            self.set_problem_rule()
            print('OK')
            print('check type...', end='')
            self.util.check_type()
            print('OK')
            print('check base rule...', end='')
            self.util.check_base_rule()
            print('OK')
        except Exception as e:
            print(e)
            return e

        for rule in self.problem_rules:
            if self.rules[rule]() is True:
                self.util.update_board()
                return 'OK', placement_data.board

        return 'error', f'miss position: {placement_data.placement}'

    def set_problem_rule(self):
        self.problem_rules.clear()
        for rule in self.util.rule[1]:
            self.problem_rules.append(int(rule))

    def segyun_add(self):
        return self.util.add_adjacent('eight')

    def segyun_move(self):
        result = []
        result.append(self.util.move(direction='EIGHT', distance=(2, 2)))
        result.append(self.util.move(direction='CUSTOM', distance=(1, 2)))
        result.append(self.util.move(direction='CUSTOM', distance=(2, 1)))

        if True in result:
            return True

    def king(self):
        return self.util.move(direction='EIGHT', distance=(1, 1))

    def pawn(self):
        return self.util.move(direction='CROSS', distance=(1, 1))

    def rook(self):
        return self.util.move(direction='CROSS', distance=(0, 0))

    def queen(self):
        pass

    def knight(self):
        pass
