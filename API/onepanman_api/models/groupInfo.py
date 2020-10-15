from django.contrib.auth.models import Group
from django.db import models

# from onepanman_api.models import Class


class GroupInfo(models.Model):
    """
    Group Information
    """

    group = models.OneToOneField(
        Group,
        verbose_name="그룹",
        primary_key=True,
        null=False,
        on_delete=models.PROTECT,
        related_name="groupInfo",
    )

    date = models.DateTimeField(
        "그룹 생성날짜",
        db_column="DATE",
        auto_now_add=True,
    )

    is_delete = models.BooleanField(
        "삭제여부",
        db_column="IS_DELETE",
        default=False
    )

    class_id = models.ForeignKey(
        "onepanman_api.Class",
        verbose_name="분반",
        db_column="CLASS",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="group_class",
    )

    # ranking = models.IntegerField(
    #     "랭킹",
    #     db_column="RANKING",
    #     null=True,
    # )
    #
    # score = models.IntegerField(
    #     "점수",
    #     db_column="SCORE",
    #     default=0,
    # )
    #
    # leader = models.ForeignKey(
    #     User,
    #     db_column="LEADER",
    #     verbose_name="그룹장",
    #     on_delete=models.PROTECT,
    #     null=True,
    #
    # )

    def __str__(self):
        return '{}_{}_{}'.format(self.group.primary_key, self.group.name, self.ranking)

    class Meta:
        db_table = "GROUPINFO"
        ordering = ['group__id']
        verbose_name = '그룹정보'
        verbose_name_plural = '그룹정보'
