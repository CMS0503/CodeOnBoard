import os
import signal
from decoration import timeout


class Execution:
    def __init__(self, limit_time=2000):
        self.limit_time = limit_time

    def execute_child(self, command, path):
        redirection_stdout = os.open(os.path.join(path + '/placement.txt'), os.O_RDWR | os.O_CREAT)
        os.dup2(redirection_stdout, 1)

        if '<' in command:
            redirection_stdin = os.open(os.path.join(path, 'board.txt'), os.O_RDONLY)
            os.dup2(redirection_stdin, 0)

        os.execv(command[0], tuple(command[1:]))

    def execute_parent(self):
        try:
            result, time = self.trace_program(pid)
        except Exception as e:
            os.kill(pid, signal.SIGSTOP)
            raise

        if '<' in command:
            while not os.path.isfile("placement.txt"):
                pass
            with open(os.path.join(path + '/placement.txt'), 'r') as fp:
                pos = fp.readline()
            os.remove("placement.txt")
            return pos

    def execute_program(self, command, path):
        """
        Execute user code

        :param command: execute command
        :type command: str
        :param path: code path
        :type path: str
        """
        pid = os.fork()
        if pid == 0:
            self.execute_child(command, path)
        else:
            try:
                return self.execute_parent()
            except:
                raise Exception('Time Over')

    @timeout.timeout(2)
    def trace_program(self, pid):
        """
        Trace running code for check running time
        :param pid: code program id
        :type pid: int
        :return: time out
        :rtype: bool
        """

        while True:
            wpid, status, res = os.wait4(pid, 0)
            # normal termination
            if os.WIFEXITED(status):
                return True, res[0]