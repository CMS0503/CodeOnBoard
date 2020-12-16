from rule.placement_rule import PlacementRule
from rule.action_rule import ActionRule
from rule.ending_rule import EndingRule


class Rules(PlacementRule, ActionRule, EndingRule):
    def __init__(self):
        PlacementRule.__init__(self)
        ActionRule.__init__(self)
        EndingRule.__init__(self)

    def check_rule(self, game_data, placement_data):
        """
        check user's placement conforms to the rule
        :param placement_data:
        :type placement_data:
        :param game_data:
        :type game_data:
        :return error msg, new board, is ending, winner:
        :rtype string | None:
        """

        # Start check placement rule
        print('Check placement rule...', end='')
        try:
            check_placement, new_board = self.check_placement_rule(game_data, placement_data)
        except Exception as e:
            error_msg = f'Error in check placement rule : {e}'
            return error_msg, None, True, 0
        print(check_placement)

        # Check Action Rule
        print('Check action rule...', end='')
        try:
            apply_action, new_board = self.apply_action_rule(game_data, placement_data)
        except Exception as e:
            error_msg = f'Error in check action rule : {e}'
            return error_msg, None, True, 0
        print(apply_action)

        # Check Ending Rule
        print('Check ending rule...', end='')
        try:
            playing, winner = self.check_ending(game_data, placement_data)
        except Exception as e:
            error_msg = f'Error check ending rule : {e}'
            return error_msg, None, True, 0

        return None, new_board, playing, winner
