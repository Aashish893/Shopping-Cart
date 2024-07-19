from django.test import TestCase
from myapp.models import Product,CartItem
from myapp.serializers import ProductSerializer, CartItemSerializer
# Create your tests here.

class ProductSerializerTest(TestCase):
    def setUp(self):
        self.product_data = {'title':'Fake Item', 'price': 20.0, 'description': 'New Item', 'image':'http://example.com/someimg.jpg'}
        self.product = Product.objects.create(**self.product_data)
        self.serializer = ProductSerializer(self.product)
    
    def test_required_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()),{'id','title', 'price', 'description', 'image'})
    
    def test_valid_data(self):
        data = self.serializer.data
        self.assertEqual(data['title'],self.product_data['title'])
        self.assertEqual(data['price'],format(self.product_data['price'], '.2f') )
        self.assertEqual(data['description'],self.product_data['description'])
        self.assertEqual(data['image'],self.product_data['image'])
    
    def test_deserialization(self):
        serializer = ProductSerializer(data=self.product_data)
        if not serializer.is_valid():
            print(serializer.errors)  
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.title,self.product_data['title'])
        self.assertEqual(product.price,float(self.product_data['price']))
        self.assertEqual(product.description,self.product_data['description'])
        self.assertEqual(product.image,self.product_data['image'])


class CartItemSerializerTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(title='Fake Item', price = 20.0, description = 'New Item', image ='')

    def test_cart_initialization(self):
        print(f"Product ID: {self.product.id}, Title: {self.product.title}")
        CartItem.objects.create(product = self.product, quantity = 1)
        cart_item = CartItem.objects.get(product = self.product)
        self.assertEqual(cart_item.quantity, 1)
    
        