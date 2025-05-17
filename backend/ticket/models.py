from django.conf import settings
from django.db import models


# ---------------------------------
# Enumerations (choices)
# ---------------------------------
class Priority(models.TextChoices):
    LOW      = 'low',      'Low'
    MEDIUM   = 'medium',   'Medium'
    HIGH     = 'high',     'High'
    CRITICAL = 'critical', 'Critical'
    URGENT   = 'urgent',   'Urgent'


class Status(models.TextChoices):
    OPEN    = 'open',    'Open'
    CLOSED  = 'closed',  'Closed'


# ---------------------------------
# Ticket
# ---------------------------------
class Ticket(models.Model):
    id         = models.AutoField(primary_key=True)
    title       = models.CharField(max_length=100)
    description = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    status   = models.CharField(max_length=10,
                                choices=Status.choices,
                                default=Status.OPEN)
    priority = models.CharField(max_length=10,
                                choices=Priority.choices,
                                default=Priority.LOW)

    owner = models.ForeignKey(              
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='tickets',
    )
    # REMOVE the ManyToManyField called messages

    def __str__(self):
        return f"{self.title} - {self.status}"
