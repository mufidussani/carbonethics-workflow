from django.db import models

# Create your models here.

# client models
class Client(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    company = models.CharField(max_length=255)

    def __str__(self):
        return self.name

# request task models
class Request(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    task = models.TextField()
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    email_team = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.client.name} - {self.status}"