from django.test import TestCase
from myapp.models import Product,CartItem

# Create your tests here.

class ProductModelTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(title='Fake Item', price = 20.0, description = 'New Item', image ='')
    
    def test_product_creation(self):
        product = Product.objects.get(title='Fake Item')
        self.assertEqual(product.price,20.0)


class CartItemModelTest(TestCase):
    def setUp(self):
        self.product = Product.objects.create(title='Fake Item', price = 20.0, description = 'New Item', image ='')

    def test_cart_initialization(self):
        CartItem.objects.create(product = self.product, quantity = 1)
        cart_item = CartItem.objects.get(product = self.product)
        self.assertEqual(cart_item.quantity, 1)
    

    # def test_cart_creation(self):
    #     cart_item = CartItem.objects.get(product__title='Fake Item')
    #     self.assertEqual(cart_item.quantity,1)
        