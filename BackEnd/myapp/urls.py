from django.urls import path
from .views import view_products, view_cart, add_to_cart

urlpatterns = [
    path('products/', view_products),
    path('cart/', view_cart),
    path('cart/add/', add_to_cart, name='add_to_cart'),
]