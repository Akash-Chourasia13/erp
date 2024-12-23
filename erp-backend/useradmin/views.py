from django.shortcuts import render
from rest_framework import viewsets,status
from .serializers import TransactionPartnerSerializer,AdminUserSerializer
from rest_framework.response import Response
from .models import AdminUser,TransactionPartner
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny,IsAuthenticated
import re
from django.http import JsonResponse

class AdminUserViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Override default permissions
    def create(self, request):
        # Extract user details from the request
        first_name = request.data.get('firstName')
        last_name = request.data.get('lastName')
        mobile_number = request.data.get('number')
        email_id = request.data.get('email')
        business_name = request.data.get('businessName')
        password = request.data.get('password')

        # Initialize the user without saving to the database
        user = AdminUser(
            first_name=first_name,
            last_name=last_name,
            mobile_number=mobile_number,
            email_id=email_id,
            business_name=business_name,
            role=0,  # Default role for new users
        )
        
        # Hash the password
        user.set_password(password)

        # Save the user instance to the database
        user.save()

        # Serialize the user to send the response
        user_serializer = AdminUserSerializer(user)
        return Response({'success': 'User is created successfully', 'user': user_serializer.data}, status=status.HTTP_201_CREATED)


class userLoginViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]  # Override default permissions
    def create(self,request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request,email=email,password=password)
        # print(AdminUser.objects.filter(email_id=email).exists())
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



class addPartnersViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def camel_to_snake(self, name):
        """Convert camelCase to snake_case."""
        return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

    def create(self, request):
        # Copy and convert request data keys to snake_case
        partner_details = request.data.copy()
        # print("Original Partner Details:", partner_details)

        partner_details_snake_case = {}
        for key, value in partner_details.items():
            if key == 'number':
                partner_details_snake_case[self.camel_to_snake('mobile')]= value 
            else:    
                partner_details_snake_case[self.camel_to_snake(key)]= value 
        
        # print("Converted Partner Details:", partner_details_snake_case)

        # Add created_by field
        partner_details_snake_case['created_by'] = request.user.id  # Use authenticated user's ID
        # print("Partner Details with Created By:", partner_details_snake_case)

        # Serialize and save
        partner_serializer = TransactionPartnerSerializer(data=partner_details_snake_case)
        if partner_serializer.is_valid():
            partner_serializer.save()
            return Response({'success': 'Partner is added successfully'}, status=status.HTTP_201_CREATED)
        else:
            # print("Serializer Errors:", partner_serializer.errors)
            return Response(partner_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class getPartnersViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self,request):
        sellerObj = TransactionPartner.objects.all()
        result = TransactionPartnerSerializer(sellerObj,many=True)
        # print(result.data)
        return Response(result.data,status=status.HTTP_200_OK)





