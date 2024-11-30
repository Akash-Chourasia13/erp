from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import viewsets,status
from .serializers import ProductSerializer,BrandSerializer,ColorSerializer,ProductModelSerializer
from .models import Product,Brand,Color,ProductModel
from rest_framework.decorators import action

class ProductViewSet(viewsets.ViewSet):
    def create(self,request):
        product_details = request.data.copy()
        product_serializer = ProductSerializer(data=product_details)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response({'success':'Product is added successfully'},status=status.HTTP_201_CREATED)
        else:
            print(product_serializer.errors)
            return Response(product_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    # use patch request for this partial_update func        
    def partial_update(self,request,pk=None):
        # product_id = request.data.get('product_id')
        product_id = pk
        product_name = request.data.get('product_name')
        try:
            product_obj = Product.objects.get(product_id=product_id)
            product_obj.product_name=product_name
            product_obj.save()
            return Response({"success":"Product Edited Successfully"},status=status.HTTP_200_OK)
        except product_obj.DoesNotExist:
            return Response({"error":"Product not found"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            # print(e)  
            return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)  


class BrandViewSet(viewsets.ViewSet):
    def create(self,request):
        brand_details = request.data.copy()
        brand_serializer = BrandSerializer(data=brand_details)
        if brand_serializer.is_valid():
            brand_serializer.save()
            return Response({'Success':'Brand is added successfully'},status=status.HTTP_201_CREATED)
        else:
            return Response(brand_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    # use patch request for this partial_update func    
    def partial_update(self,request,pk=None):
        # brand_id = request.data.get('brand_id')
        brand_id = pk
        brand_name = request.data.get('brand_name')
        try:
            brand_obj = Brand.objects.get(brand_id=brand_id)
            brand_obj.brand_name = brand_name   
            brand_obj.save() 
            return Response({"Success":"Brand is updated successfully"},status=status.HTTP_200_OK)
        except brand_obj.DoesNotExist:
            return Response({"Failed":"Brand Doesn't exist"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ColorViewSet(viewsets.ViewSet):
    def create(Self,request):
        color_details = request.data.copy()
        color_serializer = ColorSerializer(data=color_details)
        if color_serializer.is_valid():
            color_serializer.save()
            return Response({'success':"Color is added Successfully"},status=status.HTTP_201_CREATED)
        else:
            return Response({f'"error":str({color_serializer.errors})'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    # use patch request for this partial_update func    
    def partial_update(self,request,pk=None):
        color_id = pk
        color_name = request.data.get('color_name')
        try:
            color_obj = Color.objects.get(color_id=color_id)
            color_obj.color_name = color_name
            color_obj.save()
            return Response({"success":"Color is updated Successfully"},status=status.HTTP_200_OK)
        except color_obj.DoesNotExist:
            return Response({"Failed":"Color Not Found"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"Error":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class ProductModelViewSet(viewsets.ViewSet):
    def create(self,request):
        model_details = request.data.copy()
        model_serializer = ProductModelSerializer(data=model_details)
        if model_serializer.is_valid():
            model_serializer.save()
            return Response({"Success":"Model is added Successfully"},status=status.HTTP_200_OK)
        else:
            return Response({f'"Failure":str({model_serializer.errors})'},status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    # use patch request for this partial_update func    
    def partial_update(self,request,pk=None):
        model_id = pk
        model_name = request.data.get('model_name')
        try:
            model_obj = ProductModel.objects.get(model_id=model_id)
            model_obj.model_name = model_name
            model_obj.save()
            return Response({"Success":"Model is updated successfully"},status=status.HTTP_200_OK)
        except model_obj.DoesNotExist:
            return Response({"Failure":"Model desn't exist"},status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({f'"Error":str({e})'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
