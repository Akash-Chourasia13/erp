from rest_framework import serializers
from .models import SellerInventory,BuyerInventory,Inventory

class SellerInventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SellerInventory
        fields = '__all__'
        depth=1