class PlacementData:
    def __init__(self, placement, board):
        self.placement = placement
        self.board = board

        self.curr_x = None
        self.curr_y = None
        self.next_x = None
        self.next_y = None
        self.obj_number = None

        self.placement_type = None

        self.set_placement()

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

    def check_in_range(self, num, min=0, max=None):
        if max is None:
            max = len(self.board)
        return num in range(min, max)