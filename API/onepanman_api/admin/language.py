from django.contrib import admin

from .. import models


@admin.register(models.Language)
class LanguageAdmin(admin.ModelAdmin):
    """
    언어 정보
    """
    list_display = ['id', 'name']

    class Meta:
        model = models.Language

