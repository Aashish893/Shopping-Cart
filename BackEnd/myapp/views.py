import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import render
from .models import Product, CartItem
from .serializers import ProductSerializer, CartItemSerializer

@api_view(['GET'])
def view_products(request):
    response = requests.get('https://fakestoreapi.com/products')
    data = response.json()

    for item in data:
        product, created = Product.objects.get_or_create(
            id=item['id'],
            defaults={
                'title': item['title'],
                'price': item['price'],
                'description': item['description'],
                'category': item['category'],
                'image': item['image'],
            }
        )
    
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def view_cart(request):
    cart_items = CartItem.objects.all()
    serializer = CartItemSerializer(cart_items, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_to_cart(request):
    print("adding to cart")
    product_id = request.data.get('productId')
    if not product_id:
        return Response({"error": 'Need Product Id/Select Product to Add'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        product = Product.objects.get(id=product_id)  # Corrected from `product_id` to `id=product_id`
        print(product_id, 'Found Product')
    except Product.DoesNotExist:
        return Response({"error": 'Cannot Find Product'}, status=status.HTTP_404_NOT_FOUND)
    
    cart_item, created = CartItem.objects.get_or_create(product=product)

    if not created:
        cart_item.quantity += 1
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
