from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Initialize router and register your viewset
router = DefaultRouter()
router.register(r'addAdminUser',views.AdminUserViewSet,basename='addAdminUser')
router.register(r'addPartner', views.addPartnersViewSet, basename='addPartner')

# Include the router’s URLs in the urlpatterns
urlpatterns = [
    path('', include(router.urls)),
]
