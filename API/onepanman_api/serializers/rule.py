from rest_framework import serializers

from .. import models

class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Code
        fields = '__all__'