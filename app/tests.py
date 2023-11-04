from django.test import TestCase
from .models import Pizza

class PizzaModelTestCase(TestCase):
    def setUp(self):
        self.pizza = Pizza.objects.create(
            name="Margherita",
            price=10.99,
            image="margherita.jpg"
        )

    def test_pizza_name(self):
        self.assertEqual(self.pizza.name, "Margherita")

    def test_pizza_price(self):
        self.assertEqual(self.pizza.price, 10.99)

    def test_pizza_image(self):
        self.assertEqual(self.pizza.image, "margherita.jpg")

    def test_pizza_str_method(self):
        self.assertEqual(str(self.pizza), "Margherita")

    def test_pizza_model_instance(self):
        self.assertIsInstance(self.pizza, Pizza)

    def test_pizza_model_fields(self):
        pizza_fields = Pizza._meta.get_fields()
        field_names = [field.name for field in pizza_fields]
        self.assertIn('name', field_names)
        self.assertIn('price', field_names)
        self.assertIn('image', field_names)
