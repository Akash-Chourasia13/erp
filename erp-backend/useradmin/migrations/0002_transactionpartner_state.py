# Generated by Django 4.2.16 on 2024-12-08 09:44

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("useradmin", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="transactionpartner",
            name="state",
            field=models.CharField(default="", max_length=50),
        ),
    ]
