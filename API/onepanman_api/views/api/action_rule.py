from rest_framework import viewsets

from onepanman_api.models import ActionRule
from onepanman_api.serializers.rule import RuleSerializer

class ActionRuleViewSet(viewsets.ModelViewSet):
    queryset = ActionRule.objects.all()
    serializer_class = RuleSerializer

