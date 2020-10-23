from django.db import models


class ActionRule(models.Model):
    """
    Action Rule
    """
    type_choice = (
        ('condition', 'condition'),
        ('direction', 'direction'),
        ('method', 'method')
    )

    type = models.CharField(
        "TYPE",
        db_column='TYPE',
        blank=True,
        max_length=20,
        choices=type_choice
    )

    rule_number = models.IntegerField(
        "rule number",
        db_column="RULE NUMBER",
        null=False,
        blank=False,
    )

    name = models.CharField(
        "Rule Name",
        db_column="RULE_NAME",
        max_length=20,
    )

    def __str__(self):
        return f'{self.pk}_{self.type}_{self.rule_number}.{self.name}'

    class Meta:
        db_table = "ACTION RULE"
        ordering = ['pk', 'type', 'rule_number']
        verbose_name = "액션 규칙"
        verbose_name_plural = "액션 규칙"