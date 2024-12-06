from django.shortcuts import render
from rest_framework import viewsets,status
from .serializers import TransactionPartnerSerializer,AdminUserSerializer
from rest_framework.response import Response

class AdminUserViewSet(viewsets.ViewSet):
    def create(self,request):
        # user_details = request.data.copy()
        user_details = {}
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        mobile_number = request.data.get('number')
        email_id = request.data.get('email')
        business_name = request.data.get('businessName')
        password = request.data.get('password')
        user_details = {
            'first_name':first_name,
            'last_name':last_name,
            'mobile_number':mobile_number,
            'email_id':email_id,
            'business_name':business_name,
            'password':password,
            'role':0,
        }
        user_serializer = AdminUserSerializer(data=user_details)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'success':'User is created successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response(user_serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class addPartnersViewSet(viewsets.ViewSet):
    def create(self,request):
        partner_details = request.data.copy()
        partner_details['created_by'] = 1
        partner_serializer = TransactionPartnerSerializer(data=partner_details)
        if partner_serializer.is_valid():
            partner_serializer.save()
            return Response({'success':'Partner is added successfully'},status=status.HTTP_201_CREATED)
        else:
            # print(partner_serializer.errors)
            return Response(partner_serializer.errors,status=status.HTTP_400_BAD_REQUEST)






