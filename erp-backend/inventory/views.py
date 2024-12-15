from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import SellerInventory

class addSellerInventoryViewSet(viewsets.ViewSet):
    def create(self,request):
        sellerObj = SellerInventory.objects.all()
        return Response(sellerObj,status=status.HTTP_200_OK)

