import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render

# Create your views here.
@api_view(['GET'])
def view_products(request):
    response = requests.get('https://fakestoreapi.com/products')
    data = response.json()
    return Response(data)