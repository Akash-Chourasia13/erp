from django.contrib.auth.backends import ModelBackend
from useradmin.models import AdminUser

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = AdminUser.objects.get(email_id=email)
            if user.check_password(password):
                return user
        except AdminUser.DoesNotExist:
            return None
