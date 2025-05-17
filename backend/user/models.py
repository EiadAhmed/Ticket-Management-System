from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):

    id = models.AutoField(primary_key=True)



    def __str__(self):
        return f"User {self.username} ({self.email})"

