# Generated by Django 5.1.2 on 2024-11-01 18:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AdminUser",
            fields=[
                (
                    "user_id",
                    models.AutoField(
                        db_column="user_id", primary_key=True, serialize=False
                    ),
                ),
                (
                    "login_id",
                    models.CharField(db_column="login_id", max_length=30, unique=True),
                ),
                ("password", models.CharField(max_length=120)),
                ("email_id", models.CharField(max_length=120, unique=True)),
                ("first_name", models.CharField(max_length=60)),
                ("last_name", models.CharField(blank=True, max_length=60, null=True)),
                (
                    "role",
                    models.PositiveSmallIntegerField(
                        choices=[(0, "Admin"), (1, "Staff")], default=0
                    ),
                ),
                ("mobile_number", models.CharField(max_length=15)),
            ],
            options={
                "db_table_comment": "users",
                "managed": True,
            },
        ),
        migrations.CreateModel(
            name="Retailer",
            fields=[
                ("retailer_id", models.AutoField(primary_key=True, serialize=False)),
                ("retailer_name", models.CharField(max_length=30)),
                ("mobile", models.CharField(max_length=15)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="retailerCreatedBy",
                        to="useradmin.adminuser",
                    ),
                ),
            ],
            options={
                "db_table_comment": "Adding retailers",
                "managed": True,
            },
        ),
        migrations.CreateModel(
            name="TransactionPartner",
            fields=[
                ("partner_id", models.AutoField(primary_key=True, serialize=False)),
                ("partner_name", models.CharField(max_length=50)),
                ("office_number", models.CharField(max_length=30)),
                ("street_address", models.CharField(max_length=100)),
                ("area", models.CharField(max_length=100)),
                ("landmark", models.CharField(max_length=50)),
                ("pincode", models.CharField(max_length=50)),
                ("city", models.CharField(max_length=50)),
                ("country", models.CharField(max_length=50)),
                ("mobile", models.CharField(max_length=15)),
                ("gst_id", models.CharField(max_length=50, unique=True)),
                (
                    "partner_type",
                    models.IntegerField(
                        choices=[(0, "seller"), (1, "buyer")], default=0
                    ),
                ),
                (
                    "is_registered",
                    models.IntegerField(
                        choices=[(0, "Registered"), (1, "Not Registered")], default=0
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="createdBy",
                        to="useradmin.adminuser",
                    ),
                ),
            ],
            options={
                "db_table_comment": "Adding partners",
                "managed": True,
            },
        ),
    ]