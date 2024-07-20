from products.models import Product, ProductSatus
from products.serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


class ProductList(APIView):
    """
    API endpoint that allows products to be viewed or edited.
    """

    def get(self, request):
        try:
            queryset = Product.objects.all()
            req_status = request.query_params.get("status")
            if req_status is not None:
                queryset = queryset.filter(ProductStatus=req_status)
            serializer = ProductSerializer(queryset, many=True)
            response_payload = {"data": serializer.data, "message": ""}
            response_status = status.HTTP_200_OK
        except Exception as e:
            logger.error(f"ERROR: {e}")
            response_payload = {"data": None, "message": "Unexpected error"}
            response_status = status.HTTP_500_INTERNAL_SERVER_ERROR

        return Response(response_payload, status=response_status)
