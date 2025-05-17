from django.shortcuts import render
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny

from .models import Ticket
from .serializers import TicketSerializer

# Create your views here.

class IsOwnerOrStaff(IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        # Allow if user is staff or the owner of the ticket
        print(request.user)
        return request.user.is_staff or obj.owner == request.user

class TicketViewSet(ModelViewSet):
    """
    Full CRUD for tickets.  Authenticated users can create a ticket;
    only the owner or an admin can update/delete.
    """
    serializer_class   = TicketSerializer
    filter_backends    = [filters.SearchFilter, filters.OrderingFilter]
    search_fields      = ["title", "description"]
    ordering           = ["-created_at"]

    def get_queryset(self):
        print(self.request.user)
        qs = Ticket.objects.all() 

        # non-admin sees only their own tickets
        if not self.request.user.is_staff:
            qs = qs.filter(owner=self.request.user)
        return qs

    def perform_create(self, serializer):
        
        print(self.request.user)
        serializer.save(owner=self.request.user)

    def get_permissions(self):
        # Anyone logged in can list / create
        print(self.action)
        if self.action in ("list", "retrieve", "create"):
            return [IsAuthenticated()]
        # For update/delete check ownership or is_staff
        
        return [IsOwnerOrStaff()]

    def perform_update(self, serializer):
        # ownership enforcement (simple)
        if not self.request.user.is_staff and serializer.instance.owner != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not own this ticket.")
        super().perform_update(serializer)

    def perform_destroy(self, instance):
        if not self.request.user.is_staff and instance.owner != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("You do not own this ticket.")
        instance.delete()
