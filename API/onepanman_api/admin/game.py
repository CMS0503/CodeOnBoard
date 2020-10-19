from django.contrib import admin

from .. import models


@admin.register(models.Game)
class GameAdmin(admin.ModelAdmin):
    """
    게임정보
    """
    list_display = ['id', 'get_problem_id', 'get_challenger_id', 'get_opposite_id', 'winner', 'result',
                    'date', 'get_challenger_code', 'get_opposite_code', 'type']

    def get_problem_id(self, obj):
        problem = f'{obj.challenger_code.problem.pk}_{obj.challenger_code.problem.title}'
        return problem

    def get_challenger_id(self, obj):
        challenger = f'{obj.challenger_code.author.pk}_{obj.challenger_code.author.username}'
        return challenger

    def get_opposite_id(self, obj):
        opposite = f'{obj.opposite_code.author.pk}_{obj.opposite_code.author.username}'
        return opposite

    def get_challenger_code(self, obj):
        challenger_code = f'{obj.challenger_code.id}_{obj.challenger_code.name}'
        return challenger_code

    def get_opposite_code(self, obj):
        opposite_code = f'{obj.opposite_code.id}_{obj.opposite_code.name}'
        return opposite_code

    get_problem_id.short_description = "problem"
    get_challenger_id.short_description = "challenger"
    get_opposite_id.short_description = "opposite"
    get_challenger_code.short_description = "challenger_code"
    get_opposite_code.short_description = "opposite_code"

    class Meta:
        model = models.Game

