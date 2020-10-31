

class GameData:

    def __init__(self, rule, board_size, board_info, problem):
        self.rule = rule
        self.board_size = board_size    # int
        self.board_info = board_info    # string
        self.problem = problem
        print(self.rule)
