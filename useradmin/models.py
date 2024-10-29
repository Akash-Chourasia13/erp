from django.db import models

# Create your models here.
class AdminUser(models.Model):
    user_id = models.AutoField(primary_key=True,db_column='user_id')
    login_id = models.CharField(max_length=30,db_column='login_id',unique=True)
    password = models.CharField(max_length=120)
    email_id = models.CharField(max_length=120,unique=True)
    first_name = models.CharField(max_length=60,null=False,blank=False)
    last_name = models.CharField(max_length=60,blank=True,null=True)
    role_choices = [
        (0,'Admin'),
        (1,'Staff')
    ]
    role = models.PositiveSmallIntegerField(choices=role_choices,default=0)
    mobile_number = models.CharField(max_length=15,null=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.login_id})"
    
class TransactionPartner(models.Model):
    partner_id = models.AutoField(primary_key=True)
    partner_name = models.CharField(max_length=50,null=False)
    office_number = models.CharField(max_length=30)
    street_address = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    landmark = models.CharField(max_length=50)
    pincode = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    mobile = models.CharField(max_length=15)
    gst_id = models.CharField(max_length=50,unique=True,null=False)
    partner_type = models.IntegerField(choices=[(0,'seller'),(1,'buyer')],default=0)
    is_registered = models.IntegerField(choices=[(0,'Registered'),(1,'Not Registered')],default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('AdminUser',on_delete=models.CASCADE,related_name='createdBy')

    def __str__(self):
        return f"{self.partner_name} ({self.get_partner_type_display()})"





