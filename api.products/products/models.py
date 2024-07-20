from django.db import models


class ProductSatus(models.TextChoices):
    ACTIVE = "Active", "Active"
    IN_ACTIVE = "InActive", "InActive"


class Product(models.Model):
    ProductID = models.IntegerField(primary_key=True)
    ProductName = models.CharField(max_length=100, null=False)
    ProductPhotoURL = models.CharField(max_length=255, null=False)
    ProductStatus = models.CharField(max_length=8, choices=ProductSatus, null=False)

    class Meta:
        db_table = "Product"
