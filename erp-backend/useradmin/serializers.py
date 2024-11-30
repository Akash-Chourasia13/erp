from rest_framework import serializers
from .models import TransactionPartner,AdminUser

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = '__all__'

class TransactionPartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionPartner
        fields = '__all__'