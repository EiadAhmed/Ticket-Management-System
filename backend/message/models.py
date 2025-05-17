from django.db import models
from django.conf import settings


# Create your models here.


# ---------------------------------
# Message on a ticket
# ---------------------------------
class Message(models.Model):
    id= models.AutoField(primary_key=True)
    ticket = models.ForeignKey(
        'ticket.Ticket',
        on_delete=models.CASCADE,
        related_name='messages',
        default=None,
    )

    owner = models.ForeignKey(              
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='messages',
    )
    content     = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Msg #{self.id} on Ticket #{self.ticket_id} by {self.owner}"