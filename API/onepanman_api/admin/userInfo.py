from django.contrib import admin

from .. import models


@admin.register(models.UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    """
    ì½”ë“œ ì •ë³´
    """
    list_display = ['get_userid', 'user', 'language', 'nickname', 'isCodeOpen', 'group', 'date', 'profileImage']

    def get_userid(self, obj):
        return obj.user.pk

    get_userid.short_description = 'userid'

    class Meta:
        model = models.UserInfo

