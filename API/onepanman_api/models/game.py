from django.contrib.auth.models import User
from django.db import models

from onepanman_api.models import Problem, Code


class Game(models.Model):
    """
    Game
    """
    turn_choice = (
        ("challenger", "challenger"),
        ("opposite", "opposite")
    )

    result_choice = (
        ("playing", "playing"),
        ("finish", "finish"),
        ("challenger_error", "challenger_error"),
        ("opposite_error", "opposite_error"),
    )

    id = models.AutoField(
        "ID",
        db_column="ID",
        primary_key=True,
        null=False,
        blank=False,
    )

    record = models.TextField(
        '게임기록',
        db_column='RECORD',
        default="[]",
    )

    placement_record = models.TextField(
        '착수기록',
        db_column="PLACEMENT_RECORD",
        default="[]",
    )

    winner = models.CharField(
        "승리자",
        db_column='WINNER',
        default="None",         # challenger, opposite, draw
        max_length=50,
    )

    date = models.DateTimeField(
        '대전 시각',
        db_column='DATE',
        null=False,
        blank=False,
        auto_now_add=True,
    )

    challenger_code = models.ForeignKey(
        Code,
        verbose_name="도전자코드",
        db_column="CHALLENGER_CODE",
        on_delete=models.PROTECT,
        related_name="code_game_challenger_code",
    )

    opposite_code = models.ForeignKey(
        Code,
        verbose_name="상대방코드",
        db_column="OPPOSITE_CODE",
        on_delete=models.PROTECT,
        related_name="code_game_opposite_code",

    )

    result = models.CharField(
        "결과",
        db_column="RESULT",
        default="playing",   # playing / finish / challenger_error / opposite_error
        max_length=50,
        choices=result_choice,
    )

    error_msg = models.TextField(
        "에러메세지",
        db_column="ERROR_MSG",
        default="no error",
    )

    type = models.CharField(
        "game type",
        db_column="TYPE",
        default="normal",
        max_length=20,
    )

    def __str__(self):
        # return f'id_'
        return '{}_{}_{}_{}'.format(self.id, self.challenger_code.problem.title, self.challenger_code.author.username,
                                    self.opposite_code.author.username)

    class Meta:
        db_table = "GAME"
        ordering = ['id', 'challenger_code__problem', '-date']
        verbose_name = '게임정보'
        verbose_name_plural = '게임정보'


