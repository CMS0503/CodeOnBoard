class PlacementRuleUtil:

    def __init__(self, game_data, placement_data):
        self.rule = int(game_data.rule[int(placement_data.obj_number)-1]["placementRule"])
        self.placement = placement_data.placement
        self.type = game_data.rule[int(placement_data.obj_number)-1]["type"]
        self.placement_type = placement_data.placement_type


        self.board = placement_data.board
        self.curr_x = placement_data.curr_x
        self.curr_y = placement_data.curr_y
        self.next_x = placement_data.next_x
        self.next_y = placement_data.next_y
        self.obj_number = placement_data.obj_number

        self.placement_rule_option = {1: self.block_move, 2: self.remove}

        # add option
        # if self.rule[2]:
        #     self.obj_option = self.rule[2]

    def check_type(self):  # type -> 0: add, 1: move, 2: add&move
        if self.placement_type == 'add' and self.type == "move":
            raise Exception(f'stone{self.obj_number}{self.next_x, self.next_y} cant move')

        elif self.placement_type == 'move' and self.type == "add":
            raise Exception(f'stone{self.obj_number}{self.next_x, self.next_y} can only move')

    def check_base_rule(self):
        stone = int(self.obj_number)
        if stone < 0:
            raise Exception(f'It is not your stone : {self.placement}')
        elif stone == 0:
            raise Exception(f'There is no stone : {self.placement}')
        elif self.board[self.next_x][self.next_y] > 0:
            raise Exception(f'There is already your stone: {self.placement}')
        elif self.board[self.next_x][self.next_y] < 0:  # catch enemy stone
            pass
            # if self.obj_option:
            #     if 2 not in self.obj_option:
            #         raise Exception(f'There is already enemy stone: {self.placement}')
            # else:
            #     raise Exception(f'There is already enemy stone: {self.placement}')

    def check_in_range(self, num, min=0, max=None):
        if max is None:
            max = len(self.board)
        return num in range(min, max)

    def add_rule_option(self):
        if self.obj_option is not None:
            for option in self.obj_option:
                self.rules.append(self.placement_rule_option[option])

    # 인접한 곳에 돌 추가
    def add_adjacent(self, direction):
        if direction == "CROSS":
            dir = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        elif direction == "DIAGONAL":
            dir = [(-1, 1), (1, 1), (1, -1), (-1, -1)]
        elif direction == "EIGHT":
            dir = [(0, 1), (1, 0), (0, -1), (-1, 0), (-1, 1), (1, 1), (1, -1), (-1, -1)]
        for d in dir:
            x = self.next_x + d[0]
            y = self.next_y + d[1]
            if self.check_in_range(x) is False or \
                    self.check_in_range(y) is False:
                continue
            if self.board[x][y] > 0:
                return True

        return False

    # 이동
    def move(self, direction, distance):
        min_distance = distance[0]
        max_distance = distance[1]
        x_inc = abs(self.next_x - self.curr_x)
        y_inc = abs(self.next_y - self.curr_y)

        if max_distance == 0:
            max_distance = 999
        if direction == 'CROSS' or 'EIGHT':
            if (x_inc == 0 and self.check_in_range(y_inc, min=min_distance, max=max_distance+1)) or \
                    (y_inc == 0 and self.check_in_range(x_inc, min=min_distance, max=max_distance+1)):
                return True
        if direction == 'DIAGONAL' or 'EIGHT':
            if x_inc == y_inc and \
                    self.check_in_range(x_inc, min=min_distance, max=max_distance+1) and \
                    self.check_in_range(y_inc, min=min_distance, max=max_distance+1):
                return True
        if direction == 'CUSTOM':
            x_custom = distance[0]
            y_custom = distance[1]
            if x_inc == x_custom and y_inc == y_custom:
                return True

        return False

    def update_board(self):
        if self.placement_type == 'move':
            self.board[self.curr_x][self.curr_y] = 0
            self.board[self.next_x][self.next_y] = self.obj_number
        else:
            self.board[self.next_x][self.next_y] = self.obj_number

    def block_move(self):  # 이동시 충돌 무시 여부
        pass

    def remove(self):  # 상대방 돌이 존재할 시 없애고 추가
        pass
