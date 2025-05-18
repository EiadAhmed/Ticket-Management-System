# message/serializers.py
from django.contrib.auth import get_user_model
from rest_framework import serializers
from ticket.models import Ticket          # adjust import path if needed
from message.models import Message        # the model we are serializing

User = get_user_model()


class MessageSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    ticket_id = serializers.StringRelatedField(read_only=True)

    class Meta:
        model  = Message
        fields = ("id", "ticket_id", "owner",
                  "content", "created_at", "updated_at")
        read_only_fields = ("id", "created_at", "updated_at", "owner", "ticket_id")
