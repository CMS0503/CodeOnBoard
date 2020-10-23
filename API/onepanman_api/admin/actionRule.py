from django.contrib import admin

from .. import models

@admin.register(models.ActionRule)
class ActionRuleAdmin(admin.ModelAdmin):
    """
    액션 규칙 정보
    """
    list_display = ['pk', 'type', 'rule_number', 'name']

    class Meta:
        model = models.ActionRule