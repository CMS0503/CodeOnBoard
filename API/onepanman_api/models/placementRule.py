from django.db import models

class PlacementRule(models.Model):
    """
    Placement Rule
    """
    type_choice = (
        ('rule', 'rule'),
        ('option', 'option')
    )

    type = models.CharField(
        "TYPE",
        db_column='TYPE',
        default='rule',
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
        db_column="RULE NAME",
        max_length=20,
    )

    def __str__(self):
        return f'{self.pk}_{self.type}_{self.rule_number}.{self.name}'

    class Meta:
        db_table = "PLACEMENT RULE"
        ordering = ['pk', 'type', 'rule_number']
        verbose_name = "착수 규칙"
        verbose_name_plural = "착수 규칙"