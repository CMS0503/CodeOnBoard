from django.contrib import admin

from .. import models

@admin.register(models.PlacementRule)
class PlacementRuleAdmin(admin.ModelAdmin):
    """
    착수 규칙 정보
    """
    list_display = ['pk', 'type1', 'type2', 'rule_number', 'name']

    class Meta:
        model = models.PlacementRule