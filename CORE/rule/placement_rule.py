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

    def check_placement_rule(self, data, board, placement):
        self.util = PlacementRuleUtil(data, board, placement)
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
            for rule in self.problem_rules:
                if self.rules[rule]() is True:
                    break
        except Exception as e:
            print(e)
            return 'error', e

        self.util.update_board()
        return 'OK', self.util.board

    def set_problem_rule(self):
        for rule in self.util.rule[1]:
            self.problem_rules.append(int(rule))

    def segyun_add(self):
        return self.util.add_adjacent('eight')

    def segyun_move(self):
        result = []
        result.append(self.util.move(direction='eight', distance=(2, 2)))
        result.append(self.util.move(direction='custom', distance=(1, 2)))
        result.append(self.util.move(direction='custom', distance=(2, 1)))

        if True in result:
            return True

    def king(self):
        pass

    def pawn(self):
        pass

    def rook(self):
        pass

    def queen(self):
        pass

    def knight(self):
        pass
