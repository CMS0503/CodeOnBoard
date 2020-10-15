from django.db import models
from django.contrib.auth.models import Group, User

class userGroup(models.Model):
    user_id = models.ForeignKey(
        User,
        verbose_name="유저 ID",
        db_column="USER ID",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="user",
    )

    group_id = models.ForeignKey(
        Group,
        verbose_name="그룹",
        db_column="GROUP ID",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="group",
    )

    date = models.DateTimeField(
        "생성일",
        db_column="DATE",
        auto_now_add=True,
    )

    is_delete = models.BooleanField(
        "삭제여부",
        db_column="IS_DELETE",
        default=False
    )

    def __str__(self):
        return f'primaryKey_groupId_userId:{self.primary_key}_{group_id}_{self.user_id}'

    class Meta:
        db_table = "USERGROUP"
        ordering = ['primary_key', 'group_id', 'user_id']
        verbose_name = '그룹 유저 정보'
        verbose_name_plural = '그룹 유저 정보'