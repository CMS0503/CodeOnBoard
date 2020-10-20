from django.db import models

class Rule(models.Model):
    """
    Rule
    """
    id = models.AutoField(
        "ID",
        db_column='ID',
        primary_key=True,
        null=False,
        blank=False,
    )

    type = models.CharField(
        "type",
        db_column="TYPE",
        max_length=10,
    )

    name = models.CharField(
        "name",
        db_column="NAME",
        max_length=30,
    )

    def __str__(self):
        return f'{self.id}_{self.type}_{self.name}'

    class Meta:
        db_table = "RULE"
        ordering = ['id', 'type']
        verbose_name = "규칙"
        verbose_name_plural = "규칙"
