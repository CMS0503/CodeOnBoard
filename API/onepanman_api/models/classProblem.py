from django.db import models

from onepanman_api.models import Problem, Class


class ClassProblem(models.Model):
    problem_id = models.ForeignKey(
        Problem,
        verbose_name="문제 ID",
        db_column="PROBLEM ID",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="problem",
    )

    class_id = models.ForeignKey(
        Class,
        verbose_name="분반",
        db_column="CLASS ID",
        null=False,
        blank=False,
        on_delete=models.PROTECT,
        related_name="class",
    )

    def __str__(self):
        return f'primaryKey_classId_problemId:{self.primary_key}_{self.class_id}_{problem_id}'

    class Meta:
        db_table = "CLASSPROBLEM"
        ordering = ['primary_key', 'class_id', 'problem_id']
        verbose_name = '분반 문제 정보'
        verbose_name_plural = '분반 문제 정보'