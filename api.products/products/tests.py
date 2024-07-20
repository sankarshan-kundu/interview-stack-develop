from products.models import Product, ProductSatus
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class ProductTestCase(APITestCase):
    databases = "__all__"

    def setUp(self):
        Product.objects.create(
            ProductID=1,
            ProductName="p1",
            ProductPhotoURL="http://image.com/p1.jpg",
            ProductStatus=ProductSatus.ACTIVE,
        )
        Product.objects.create(
            ProductID=2,
            ProductName="p2",
            ProductPhotoURL="http://image.com/p2.jpg",
            ProductStatus=ProductSatus.IN_ACTIVE,
        )

    def test_products_data(self):
        """Test Products"""
        p1 = Product.objects.get(ProductName="p1")
        p2 = Product.objects.get(ProductName="p2")
        self.assertEqual(p1.ProductStatus, ProductSatus.ACTIVE)
        self.assertEqual(p2.ProductStatus, ProductSatus.IN_ACTIVE)

    def test_products_api(self):
        """Test Product API"""
        url = reverse("products")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.data.get("data", [])
        self.assertEqual(len(response_data), 2)
        expected_data = [
            {
                "ProductID": 1,
                "ProductName": "p1",
                "ProductPhotoURL": "http://image.com/p1.jpg",
            },
            {
                "ProductID": 2,
                "ProductName": "p2",
                "ProductPhotoURL": "http://image.com/p2.jpg",
            },
        ]
        self.assertEqual(response_data, expected_data)

    def test_products_api_filter(self):
        """Test Product API"""
        url = reverse("products") + "?status=Active"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.data.get("data", [])
        self.assertEqual(len(response_data), 1)
        expected_data = [
            {
                "ProductID": 1,
                "ProductName": "p1",
                "ProductPhotoURL": "http://image.com/p1.jpg",
            }
        ]
        self.assertEqual(response_data, expected_data)
