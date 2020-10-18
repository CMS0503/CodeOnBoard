from rest_framework import serializers

from .. import models


class GameSerializer(serializers.ModelSerializer):
    challenger = serializers.ReadOnlyField(source='challenger_code.author')
    opposite = serializers.ReadOnlyField(source='opposite_code.author')
    challenger_name = serializers.ReadOnlyField(source='challenger_code.author.username')
    opposite_name = serializers.ReadOnlyField(source='opposite_code.author.username')
    problem = serializers.ReadOnlyField(source='challenger_code.author.problem')

    class Meta:
        model = models.Game
        # fields = ['id', 'problem', 'placement_record', 'challenger', 'opposite', 'record', 'winner', 'date',
        #           'challenger_code', 'opposite_code', 'result', 'error_msg', 'challenger_name', 'opposite_name', 'type']
        fields = "__all__"