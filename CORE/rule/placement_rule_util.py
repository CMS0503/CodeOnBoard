class PlacementRuleUtil:
    def __init__(self, data, board, placement):
        self.board_size = data.board_size
        self.board = board
        self.placement = placement
        self.placement_type = None

        self.placement_rule_option = {1: self.block_move, 2: self.remove}

        self.curr_x = None
        self.curr_y = None
        self.next_x = None
        self.next_y = None
        self.obj_number = None
        self.set_placement()

        self.rule = data.placement_rule[self.obj_number]
        self.type = self.rule[0]

        # add option
        if self.rule[2]:
            self.obj_option = self.rule[2]

    def check_type(self): # 0: add, 1: move, 2: add&move
        if '>' in self.placement:
            if self.type == 0 or 2:
                pass
            else:
                raise Exception(f'stone{self.obj_number}{self.next_x, self.next_y} cant move')

        elif '>' not in self.placement:
            if self.type == 1 or 2:
                pass
            else:
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
            if self.obj_option:
                if 2 in self.obj_option:
                    pass
                else:
                    raise Exception(f'There is already enemy stone: {self.placement}')
            else:
                raise Exception(f'There is already enemy stone: {self.placement}')

    def set_placement(self):
        print('set placement')
        try:
            if '>' in self.placement:
                self.placement_type = 'move'
                self.curr_x = list(map(int, self.placement.split('>')[0].split()))[0]
                self.curr_y = list(map(int, self.placement.split('>')[0].split()))[1]

                self.next_x = list(map(int, self.placement.split('>')[1].split()))[0]
                self.next_y = list(map(int, self.placement.split('>')[1].split()))[1]
                self.obj_number = str(self.board[self.curr_x][self.curr_y])

                if self.check_in_range(self.curr_x) is False or \
                        self.check_in_range(self.curr_y) is False:
                    raise Exception(f'pos {self.curr_x, self.curr_y} is out of board:{self.placement}')
            else:
                self.placement_type = 'add'
                self.next_x = list(map(int, self.placement.split()))[1]
                self.next_y = list(map(int, self.placement.split()))[2]
                self.obj_number = list(map(str, self.placement.split()))[0]

            if self.check_in_range(self.next_x) is False or \
                    self.check_in_range(self.next_y) is False:
                raise Exception(f'pos {self.next_x, self.next_y} is out of board:{self.placement}')
        except Exception as e:
            print(e)

    def add_rule_option(self):
        if self.obj_option is not None:
            for option in self.obj_option:
                self.rules.append(self.placement_rule_option[option])

    def check_in_range(self, num, min=0, max=None):
        if max is None:
            max = self.board_size
        return num in range(min, max)

    # 인접한 곳에 돌 추가
    def add_adjacent(self, direction):
        if direction == "CROSS":
            dir = [(0, 1), (1, 0), (0, -1), (-1, 0)]
        elif direction == "DIAGONAL":
            dir = [(-1, 1), (1, 1), (1, -1), (-1, -1)]
        elif direction == "eight":
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
        if direction == 'CROSS' or 'Eight':
            if (x_inc == 0 and self.check_in_range(y_inc, min=min_distance, max=max_distance+1)) or \
                    (y_inc == 0 and self.check_in_range(x_inc, min=min_distance, max=max_distance+1)):
                return True
        if direction == 'DIAGONAL' or 'Eight':
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
