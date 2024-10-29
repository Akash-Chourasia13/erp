from django.db import models
from useradmin.models import AdminUser


class Retailer(models.Model):
    retailer_id = models.AutoField(primary_key=True)
    retailer_name = models.CharField(max_length=30)
    mobile = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='retailerCreatedBy')
