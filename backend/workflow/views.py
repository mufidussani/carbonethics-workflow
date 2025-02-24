from django.shortcuts import render

# Create your views here.
import requests
from rest_framework import viewsets
from .models import Client, Request
from .serializers import ClientSerializer, RequestSerializer

# webhook zapier
ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/21822822/2gt4jaa/"

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class RequestViewSet(viewsets.ModelViewSet):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer

    def perform_create(self, serializer):
        request_instance = serializer.save()

        # Send data to Zapier
        webhook_data = {
            "client_name": request_instance.client.name,
            "client_email": request_instance.client.email,
            "task": request_instance.task,
            "description": request_instance.description,
            "status": request_instance.status,
            "email_team": request_instance.email_team,
        }

        try:
            requests.post(ZAPIER_WEBHOOK_URL, json=webhook_data)
        except Exception as e:
            print("Failed to send data to Zapier:", e)
