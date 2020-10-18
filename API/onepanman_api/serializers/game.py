from rest_framework import serializers

from .. import models


class GameSerializer(serializers.ModelSerializer):
    challenger = serializers.ReadOnlyField(source='challenger_code.author.id')
    opposite = serializers.ReadOnlyField(source='opposite_code.author.id')
    challenger_name = serializers.ReadOnlyField(source='challenger_code.author.username')
    opposite_name = serializers.ReadOnlyField(source='opposite_code.author.username')
    problem = serializers.ReadOnlyField(source='challenger_code.problem.id')

    class Meta:
        model = models.Game
        # fields = ['id', 'placement_record', 'record', 'winner', 'date', 'problem',
        #           'challenger_code', 'opposite_code', 'result', 'error_msg', 'type']
        fields = "__all__"