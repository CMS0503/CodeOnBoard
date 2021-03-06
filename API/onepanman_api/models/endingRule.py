from django.db import models


class EndingRule(models.Model):
    """
    Ending Rule
    """
    type_choice = (
        ('rule', 'rule'),
        ('option', 'option')
    )

    type1 = models.CharField(
        "TYPE1",
        db_column='TYPE1',
        max_length=20,
        default='rule',
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
        return f'{self.pk}_{self.type1}_{self.rule_number}.{self.name}'

    class Meta:
        db_table = "ENDING RULE"
        ordering = ['pk', 'type1', 'rule_number']
        verbose_name = "엔딩 규칙"
        verbose_name_plural = "엔딩 규칙"