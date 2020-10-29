from django.db import models

class PlacementRule(models.Model):
    """
    Placement Rule
    """
    type_choice = (
        ('rule', 'rule'),
        ('option', 'option')
    )

    type1 = models.CharField(
        "TYPE1",
        db_column='TYPE1',
        default='rule',
        max_length=20,
        choices=type_choice
    )

    type2 = models.IntegerField(  # 0:
        "TPYE2",
        db_column="TYPE2",
        default=-1,
    )

    rule_number = models.IntegerField(
        "rule number",
        db_column="RULE NUMBER",
        null=False,
        blank=False,
    )

    name = models.CharField(
        "Rule Name",
        db_column="RULE NAME",
        max_length=20,
    )

    def __str__(self):
        return f'{self.pk}_{self.type1}_{self.type2}_{self.rule_number}.{self.name}'

    class Meta:
        db_table = "PLACEMENT RULE"
        ordering = ['pk', 'type1', 'rule_number']
        verbose_name = "착수 규칙"
        verbose_name_plural = "착수 규칙"