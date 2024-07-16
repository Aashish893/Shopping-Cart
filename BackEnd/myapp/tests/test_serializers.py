from django.test import TestCase
from rest_framework.exceptions import ValidationError
from myapp.models import Product,CartItem
from myapp.serializers import ProductSerializer, CartItemSerializer
# Create your tests here.

class ProductSerializerTest(TestCase):
    def setUp(self):
        self.product_data = {'title':'Fake Item', 'price': '20.00', 'description': 'New Item', 'image':'http://example.com/someimg.jpg'}
        self.product = Product.objects.create(**self.product_data)
        self.serializer = ProductSerializer(self.product)
    
    def test_required_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()),{'id','title', 'price', 'description', 'image'})
    
    def test_valid_data(self):
        data = self.serializer.data
        self.assertEqual(data['title'],self.product_data['title'])
        self.assertEqual(data['price'],self.product_data['price'])
        self.assertEqual(data['description'],self.product_data['description'])
        self.assertEqual(data['image'],self.product_data['image'])
    
    def test_deserialization(self):
        serializer = ProductSerializer(data=self.product_data) 
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.title,self.product_data['title'])
        self.assertEqual(product.price,float(self.product_data['price']))
        self.assertEqual(product.description,self.product_data['description'])
        self.assertEqual(product.image,self.product_data['image'])


class CartItemSerializerTest(TestCase):

    def setUp(self):
        self.product_data = {'title':'Fake Item', 'price': '20.00', 'description': 'New Item', 'image':'http://example.com/someimg.jpg'}
        self.product = Product.objects.create(**self.product_data)
        self.cart_item = CartItem.objects.create(
            product=self.product,
            quantity=2
        )
        self.cart_item_serializer_data = {
            'product': {
                'title': self.product.title,
                'price': float(self.product.price),  # Ensure price is a float for comparison
                'description': self.product.description,
                'image': self.product.image
            },
            'quantity': self.cart_item.quantity
        }

    def test_required_fields(self):
        serializer = CartItemSerializer(instance=self.cart_item)
        data = serializer.data
        self.assertEqual(set(data.keys()), set(['id','product', 'quantity']))

    def test_valid_data(self):
        serializer = CartItemSerializer(instance=self.cart_item)
        data = serializer.data

        self.assertEqual(data['product']['title'], self.product.title)
        self.assertEqual(data['product']['price'], self.product.price)  
        self.assertEqual(data['product']['description'], self.product.description)
        self.assertEqual(data['product']['image'], self.product.image)

    def test_deserialization(self):
        serializer = CartItemSerializer(instance=self.cart_item)
        data = serializer.data
        self.assertEqual(data['quantity'], self.cart_item.quantity)

    def test_cart_item_serializer_valid_data(self):
        serializer = CartItemSerializer(data=self.cart_item_serializer_data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['quantity'], self.cart_item.quantity)
        self.assertEqual(serializer.validated_data['product']['title'], self.product.title)
        self.assertEqual(str(serializer.validated_data['product']['price']), self.product.price)  # Ensure comparison with float
        self.assertEqual(serializer.validated_data['product']['description'], self.product.description)
        self.assertEqual(serializer.validated_data['product']['image'], self.product.image)