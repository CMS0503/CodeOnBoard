from django.contrib import admin

from .. import models

@admin.register(models.EndingRule)
class EndingRuleAdmin(admin.ModelAdmin):
    """
    엔딩 규칙 정보
    """
    list_display = ['pk', 'type', 'rule_number', 'name']

    class Meta:
        model = models.EndingRule