from rest_framework import serializers
from .models import Client, Request

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class RequestSerializer(serializers.ModelSerializer):
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), source="client", write_only=True)
    client = ClientSerializer(read_only=True)  # Returns full client details in response

    class Meta:
        model = Request
        fields = ['id', 'client_id', 'client', 'task', 'description', 'status', 'email_team', 'created_at']
