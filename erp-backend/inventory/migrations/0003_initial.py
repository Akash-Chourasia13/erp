# Generated by Django 4.2.16 on 2024-12-06 20:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("inventory", "0002_initial"),
        ("contenttypes", "0002_remove_content_type_name"),
        ("useradmin", "0001_initial"),
        ("product", "0002_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="sellerinventory",
            name="created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="sellerCreatedBy",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="sellerinventory",
            name="model_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="sellerModelName",
                to="product.productmodel",
            ),
        ),
        migrations.AddField(
            model_name="sellerinventory",
            name="partner_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="sellerPartnerId",
                to="useradmin.transactionpartner",
            ),
        ),
        migrations.AddField(
            model_name="sellerinventory",
            name="product_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="sellerProductId",
                to="product.product",
            ),
        ),
        migrations.AddField(
            model_name="invoice",
            name="created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="InvoiceCreatedBy",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="invoice",
            name="entity_type",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="contenttypes.contenttype",
            ),
        ),
        migrations.AddField(
            model_name="inventory",
            name="brand_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventoryBrandId",
                to="product.brand",
            ),
        ),
        migrations.AddField(
            model_name="inventory",
            name="color_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventoryColorId",
                to="product.color",
            ),
        ),
        migrations.AddField(
            model_name="inventory",
            name="created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="InventoryCreatedBy",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="inventory",
            name="model_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventoryModelName",
                to="product.productmodel",
            ),
        ),
        migrations.AddField(
            model_name="inventory",
            name="product_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="inventoryProductId",
                to="product.product",
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="brand_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerBrandId",
                to="product.brand",
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="color_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerColorId",
                to="product.color",
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="created_by",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerCreatedBy",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="model_name",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerModelName",
                to="product.productmodel",
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="partner_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerPartnerId",
                to="useradmin.transactionpartner",
            ),
        ),
        migrations.AddField(
            model_name="buyerinventory",
            name="product_id",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="buyerProductId",
                to="product.product",
            ),
        ),
    ]