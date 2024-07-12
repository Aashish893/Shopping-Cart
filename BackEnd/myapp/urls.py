from django.urls import path
from .views import view_products

urlpatterns = [
    path('products/', view_products),
]