from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Ticket
from message.models import Message
from message.serializers import MessageSerializer

User = get_user_model()

class TicketSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)  # Make it read-only
    owner = serializers.StringRelatedField(read_only=True)


    class Meta:
        model = Ticket
        fields = [
            "id", 
            "title", 
            "description",
            "status", 
            "priority", 
            "owner",
            "created_at", 
            "updated_at", 
            "messages"
        ]
        read_only_fields = ["id", "created_at", "updated_at", "owner"]