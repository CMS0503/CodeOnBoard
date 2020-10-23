from rest_framework import viewsets

from onepanman_api.models import EndingRule
from onepanman_api.serializers.rule import RuleSerializer

class EndingRuleViewSet(viewsets.ModelViewSet):
    queryset = EndingRule.objects.all()
    serializer_class = RuleSerializer

