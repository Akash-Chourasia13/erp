from django.db import models
from product.models import Product,Brand,Color,ProductModel
from useradmin.models import TransactionPartner,AdminUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class SellerInventory(models.Model):
    id = models.AutoField(primary_key = True)
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='sellerProductId')
    brand_id = models.ForeignKey(Brand,on_delete=models.CASCADE,related_name='sellerBrandId')
    model_id = models.ForeignKey(ProductModel,on_delete=models.CASCADE,related_name='sellerModelName')
    partner_id = models.ForeignKey(TransactionPartner,on_delete=models.CASCADE,related_name='sellerPartnerId')
    color_id = models.ForeignKey(Color,on_delete=models.CASCADE,related_name='sellerColorId')
    hsncode = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=20,decimal_places=2)
    gross_price = models.DecimalField(max_digits=20,decimal_places=2)
    discount_perc = models.DecimalField(max_digits=3,decimal_places=2)
    net_price = models.DecimalField(max_digits=20,decimal_places=2)
    gst_perc = models.DecimalField(max_digits=10,decimal_places=2)
    final_amount = models.DecimalField(max_digits=30,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='sellerCreatedBy')
    
class BuyerInventory(models.Model):
    id = models.AutoField(primary_key=True)
    partner_id = models.ForeignKey(TransactionPartner,on_delete=models.CASCADE,related_name='buyerPartnerId')
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='buyerProductId')
    brand_id = models.ForeignKey(Brand,on_delete=models.CASCADE,related_name='buyerBrandId')
    model_id = models.ForeignKey(ProductModel,on_delete=models.CASCADE,related_name='buyerModelName')
    color_id = models.ForeignKey(Color,on_delete=models.CASCADE,related_name='buyerColorId')
    hsncode = models.CharField(max_length=50)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=20,decimal_places=2)
    gross_price = models.DecimalField(max_digits=20,decimal_places=2)
    discount_perc = models.DecimalField(max_digits=3,decimal_places=2)
    net_price = models.DecimalField(max_digits=20,decimal_places=2)
    gst_perc = models.DecimalField(max_digits=10,decimal_places=2)
    final_amount = models.DecimalField(max_digits=30,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='buyerCreatedBy')


class Inventory(models.Model):
    id = models.AutoField(primary_key=True)
    product_id = models.ForeignKey(Product,on_delete=models.CASCADE,related_name='inventoryProductId')
    brand_id = models.ForeignKey(Brand,on_delete=models.CASCADE,related_name='inventoryBrandId')
    model_id = models.ForeignKey(ProductModel,on_delete=models.CASCADE,related_name='inventoryModelName')
    color_id = models.ForeignKey(Color,on_delete=models.CASCADE,related_name='inventoryColorId')
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=20,decimal_places=2)
    gross_price = models.DecimalField(max_digits=20,decimal_places=2)
    discount_perc = models.DecimalField(max_digits=20,decimal_places=2)
    net_price = models.DecimalField(max_digits=20,decimal_places=2)
    gst_perc = models.DecimalField(max_digits=20,decimal_places=2)
    final_amount = models.DecimalField(max_digits=30,decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='InventoryCreatedBy')


class Invoice(models.Model):
    Entity_Type_Choices = [('TransactionPartner', ' Transaction Partner'),('Retailer', 'Retailer')]
    invoice_id = models.AutoField(primary_key=True)
    entity_type = models.ForeignKey(ContentType,on_delete=models.CASCADE)
    entity_id = models.PositiveIntegerField()
    entity = GenericForeignKey('entity_type','entity_id')
    entityType = models.CharField(max_length=20,choices=Entity_Type_Choices)
    invoice_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=15,decimal_places=2)
    discount_perc = models.DecimalField(max_digits=3,decimal_places=2)
    net_amount = models.DecimalField(max_digits=15,decimal_places=2)
    gst_Perc = models.DecimalField(max_digits=15,decimal_places=2)
    final_amount = models.DecimalField(max_digits=30,decimal_places=2)
    payment_status_choices = [(0,'Fullfilled'),(1,'Pending'),(2,'Rejected')]
    payment_status = models.IntegerField(choices=payment_status_choices,default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='InvoiceCreatedBy')


    def __str__(self):
        return f'Invoice{self.invoice_id} - {self.entityType}'
    def save(self,*args,**kwargs):
        if self.entity_type:
            if self.entity_type.model == 'TransactionPartner':
                self.entityType = 'TransactionPartner'
            elif self.entity_type.model == 'Retailer':
                self.entityType = 'Retailer'
        super().save(*args,**kwargs)
