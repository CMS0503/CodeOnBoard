# -*- coding: utf-8 -*-
import numpy as np
from .placement_rule_util import PlacementRuleUtil


class PlacementRule:

    def __init__(self):
        self.util = None
        self.rules = {
            1: self.segyun_add, 2: self.segyun_move,
            3: self.king, 4: self.pawn, 5: self.rook,
        }

        self.problem_rule = None

    def check_placement_rule(self, game_data, placement_data):
        """
        Check user placement is correct

        :param game_data: rule data
        :param placement_data: user placement, current board
        :return: check result, update board
        :rtype: str, 2d list of int
        """
        
        self.util = PlacementRuleUtil(game_data, placement_data)

        # game type check
        try:
            print('set problem rule...', end='')
            self.set_problem_rule()

            print('check type...', end='')
            self.util.check_type()

            print('check base rule...', end='')
            self.util.check_base_rule()
        except Exception as e:
            print(e)
            return e

        # execute placement rule function
        if self.rules[int(self.problem_rule)]() is True:
            self.util.update_board()

            return 'OK', placement_data.board
        raise Exception(f'miss position: {placement_data.placement}')

    def set_problem_rule(self):
        """
        Set problem rule number
        """

        self.problem_rule = int(self.util.rule)

    def segyun_add(self):
        """
        세균전 추가 규칙

        :return: return True if user placement is right to this function
        :rtype: bool
        """

        return self.util.add_adjacent('EIGHT')

    def segyun_move(self):
        """
        세균전 이동 규칙

        :return: return True if user placement is right to this function
        :rtype: bool
        """

        result = []
        print(self.util.type)
        if self.util.placement_type == 'add':
            result.append(self.util.add_adjacent('EIGHT'))
        else:
            result.append(self.util.move(direction='EIGHT', distance=(2, 2)))
            result.append(self.util.move(direction='CUSTOM', distance=(1, 2)))
            result.append(self.util.move(direction='CUSTOM', distance=(2, 1)))
        print('result:', result)
        if True in result:
            return True
        return False

    def king(self):
        """
        Chess king rule

        :return: return True if user placement is right to this function
        :rtype: bool
        """

        return self.util.move(direction='EIGHT', distance=(1, 1))

    def pawn(self):
        """
        Chess pawn rule

        :return: return True if user placement is right to this function
        :rtype: bool
        """

        return self.util.move(direction='CROSS', distance=(1, 1))

    def rook(self):
        """
        Chess rook rule

        :return: return True if user placement is right to this function
        :rtype: bool
        """

        return self.util.move(direction='CROSS', distance=(0, 0))
