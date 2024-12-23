from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets,status
from rest_framework.response import Response
from .models import SellerInventory
from .serializers import SellerInventorySerializer

class addSellerInventoryViewSet(viewsets.ViewSet):
    def create(self,request):
        try:
            # print(request.data.copy())
            product_id = request.data.get('productId')
            brand_id = request.data.get('brandId')
            model_id = request.data.get('modelId')
            partner_id = request.data.get('partnerId')
            color_id = request.data.get('colorId')
            hsncode = request.data.get('hsnCode')
            quantity = request.data.get('quantity')
            unit_price = request.data.get('unitPrice')
            gross_price = request.data.get('grossPrice')
            discount_perc = request.data.get('discPerc')
            net_price = request.data.get('netPrice')
            gst_perc = request.data.get('gstPerc')
            final_amount = request.data.get('finalAmount')
            created_by = request.user.id
            
            # Data validation (if necessary)
            if not product_id or not quantity or not unit_price:
                return Response({
                    'message': 'Missing required fields: productId, quantity, unitPrice.'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create a new record using Django ORM
            inventory = SellerInventory.objects.create(
                product_id_id=product_id,
                brand_id_id=brand_id,
                model_id_id=model_id,
                partner_id_id=partner_id,
                color_id_id=color_id,
                hsncode=hsncode,
                quantity=quantity,
                unit_price=unit_price,
                gross_price=gross_price,
                discount_perc=discount_perc,
                net_price=net_price,
                gst_perc=gst_perc,
                final_amount=final_amount,
                created_by_id=created_by
            )

            # Return a success response
            return Response({
                'message': 'Inventory record created successfully.',
                'data': {
                    'id': inventory.id,
                    'product_id': inventory.product_id_id,
                    'quantity': inventory.quantity,
                    'final_amount': inventory.final_amount,
                    'created_by': inventory.created_by_id
                }
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            # Return error response for unexpected issues
            return Response({
                'message': 'An error occurred while creating the inventory record.',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class getSellerInventoryListViewSet(viewsets.ViewSet):
    def create(self,request):
        id = request.data.get('id')
        print("idid",id)
        vendorObjs = SellerInventory.objects.filter(partner_id_id=id)
        vendorSerializer = SellerInventorySerializer(vendorObjs,many=True)
        print(vendorSerializer.data)
        return Response(vendorSerializer.data,status=status.HTTP_200_OK)
