from rest_framework import viewsets

from onepanman_api.models import PlacementRule
from onepanman_api.serializers.rule import RuleSerializer

class PlacementRuleViewSet(viewsets.ModelViewSet):
    queryset = PlacementRule.objects.all()
    serializer_class = RuleSerializer

