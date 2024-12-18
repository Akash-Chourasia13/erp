from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'addProduct',views.ProductViewSet,basename='addProduct')
router.register(r'getProduct',views.getProductViewSet,basename='getProduct')
router.register(r'addBrand', views.BrandViewSet, basename='addBrand')
router.register(r'getBrand', views.getBrandViewSet, basename='getBrand')
router.register(r'addColor', views.ColorViewSet, basename='addColor')
router.register(r'getColor', views.getColorViewSet, basename='getColor')
router.register(r'addModel', views.ProductModelViewSet, basename='addModel')
router.register(r'getModel', views.getProductModelViewSet, basename='getModel')
urlpatterns = [
    path('',include(router.urls))
]