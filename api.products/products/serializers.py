from products.models import Product
from rest_framework import serializers


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Product
        fields = ["ProductID", "ProductName", "ProductPhotoURL"]
