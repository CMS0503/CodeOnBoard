from django.contrib import admin

from .. import models


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    """
    게임정보
    """
    list_display = ['id', 'get_problem_id', 'get_challenger_id', 'get_opposite_id', 'winner', 'result',
                    'date', 'challenger_code', 'opposite_code', 'type']

    def get_problem_id(self, obj):
        return obj.challenger.problem.pk

    def get_challenger_id(self, obj):
        return obj.challenger_code.author.pk

    def get_opposite_id(self, obj):
        return obj.opposite_code.author.pk

    get_problem_id.short_description = "problem"
    get_challenger_id.short_description = "challenger"
    get_opposite_id.short_description = "opposite"

    class Meta:
        model = models.Game

