from django.contrib import admin

from .. import models


@admin.register(models.GroupInfo)
class GroupInfoAdmin(admin.ModelAdmin):
    """
    그룹정보
    """
    list_display = ['group']
    
    class Meta:
        model = models.GroupInfo

