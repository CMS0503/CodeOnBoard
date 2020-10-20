import json
import django_filters

from rest_framework import viewsets

from onepanman_api.models import Rule
from onepanman_api.serializers.rule import RuleSerializer

from rest_framework.response import Response

class RuleViewSet(viewsets.ModelViewSet):
    queryset = Rule.objects.all()
    serializer_class = RuleSerializer

