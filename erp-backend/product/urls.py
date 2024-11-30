from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'addProduct',views.ProductViewSet,basename='addProduct')
router.register(r'addBrand', views.BrandViewSet, basename='addBrand')
router.register(r'addColor', views.ColorViewSet, basename='addColor')
router.register(r'addModel', views.ProductModelViewSet, basename='addModel')
urlpatterns = [
    path('',include(router.urls))
]