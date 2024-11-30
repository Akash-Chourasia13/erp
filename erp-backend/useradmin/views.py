# from django.shortcuts import render
# from rest_framework import viewsets,status
# from .serializers import TransactionPartnerSerializer
# from rest_framework.response import Response

# class AdminUserViewSet(viewsets.ViewSet):


# class addPartnersViewSet(viewsets.ViewSet):
#     def create(self,request):
#         partner_details = request.data.copy()
#         partner_details['created_by'] = 1
#         partner_serializer = TransactionPartnerSerializer(data=partner_details)
#         if partner_serializer.is_valid():
#             partner_serializer.save()
#             return Response({'success':'Partner is added successfully'},status=status.HTTP_201_CREATED)
#         else:
#             # print(partner_serializer.errors)
#             return Response(partner_serializer.errors,status=status.HTTP_400_BAD_REQUEST)






