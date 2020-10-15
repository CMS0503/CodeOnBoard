from django.db import models


class Class(models.Model):
    name = models.CharField(
        '분반',
        db_column='CLASS',
        max_length=20,
        null=False,
        blank=False,
        default=" ",
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

    use_group = models.BooleanField(
        "그룹 사용 여부",
        db_column="USE_GROUP",
        default=False
    )

    def __str__(self):
        return '{}_{}'.format(self.primary_key, self.name)

    class Meta:
        db_table = "CLASS"
        ordering = ['primary_key']
        verbose_name = '클래스정보'
        verbose_name_plural = '클래스정보'