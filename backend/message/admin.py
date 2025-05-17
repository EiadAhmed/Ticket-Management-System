from django.contrib import admin
from .models import  Message
# Register your models here.

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display  = ("id", "ticket", "owner", "created_at")
    list_filter   = ("ticket",)
    search_fields = ("ticket__title", "owner__username", "content")
    