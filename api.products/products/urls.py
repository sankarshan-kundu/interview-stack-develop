from django.urls import path
from products.views import ProductList
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("", ProductList.as_view(), name="products"),
]

urlpatterns = format_suffix_patterns(urlpatterns)
