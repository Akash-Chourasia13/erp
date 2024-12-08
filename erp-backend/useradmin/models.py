from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

class AdminUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email_id=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('role', 0)  # Default to 'Admin'
        return self.create_user(email, password, **extra_fields)

class AdminUser(AbstractBaseUser, PermissionsMixin):
    email_id = models.EmailField(max_length=120, unique=True)
    first_name = models.CharField(max_length=60, null=False, blank=False)
    last_name = models.CharField(max_length=60, blank=True, null=True)
    role_choices = [
        (0, 'Admin'),
        (1, 'Staff'),
    ]
    role = models.PositiveSmallIntegerField(choices=role_choices, default=1)
    mobile_number = models.CharField(max_length=15, null=False)
    business_name = models.CharField(max_length=40, default='')
    parent_business = models.ForeignKey('self', on_delete=models.CASCADE, related_name='parentBusiness', null=True, blank=True)

    objects = AdminUserManager()

    USERNAME_FIELD = 'email_id'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'mobile_number']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email_id})"

    class Meta:
        managed = True
        db_table_comment = 'users'


    
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
    state = models.CharField(max_length=50,default="")
    mobile = models.CharField(max_length=15)
    gst_id = models.CharField(max_length=50,unique=True,null=False)
    partner_type = models.IntegerField(choices=[(0,'seller'),(1,'buyer')],default=0)
    is_registered = models.IntegerField(choices=[(0,'Registered'),(1,'Not Registered')],default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey('AdminUser',on_delete=models.CASCADE,related_name='createdBy')

    def __str__(self):
        return f"{self.partner_name} ({self.get_partner_type_display()})"
    
    class Meta:
        managed=True
        db_table_comment = 'Adding partners'
    
class Retailer(models.Model):
    retailer_id = models.AutoField(primary_key=True)
    retailer_name = models.CharField(max_length=30)
    mobile = models.CharField(max_length=15)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(AdminUser,on_delete=models.CASCADE,related_name='retailerCreatedBy')    

    def __str__(self):
        return f"{self.retailer_name}"

    class Meta:
        managed=True
        db_table_comment = 'Adding retailers'





