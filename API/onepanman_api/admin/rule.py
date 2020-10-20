from django.contrib import admin

from .. import models

@admin.register(models.Rule)
class RuleAdmin(admin.ModelAdmin):
    """
    규칙 정보
    """
    list_display = ['id', 'type', 'name']

    class Meta:
        model = models.Rule