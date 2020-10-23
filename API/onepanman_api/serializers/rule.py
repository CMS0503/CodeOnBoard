from rest_framework import serializers

from .. import models

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PlacementRule
        fields = '__all__'