from django.shortcuts import render, get_object_or_404

from .serializers import MessageSerializer
from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .models import Message
from rest_framework import filters
from ticket.models import Ticket
# Create your views here.
class MessageViewSet(ModelViewSet):
    """
    Messages belong to a ticket. User must be ticket owner or admin.
    """
    serializer_class = MessageSerializer
    filter_backends  = [filters.OrderingFilter]
    ordering         = ["created_at"]

    def get_queryset(self):
        qs = Message.objects.select_related("ticket", "onwer")
        if not self.request.user.is_staff:
            qs = qs.filter(ticket__owner=self.request.user)
        return qs

    def perform_create(self, serializer):
        ticket_id = self.request.data.get('ticket_id')
        ticket = get_object_or_404(Ticket, id=ticket_id)
        if (
            not self.request.user.is_staff
            and ticket.owner != self.request.user
        ):
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You are not allowed to post on this ticket.")
        serializer.save(owner=self.request.user, ticket=ticket)