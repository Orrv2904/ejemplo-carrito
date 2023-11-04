from django.shortcuts import render
from .models import *

def index(request):
    pizzas = Pizza.objects.all()
    pizza_data = []
    for pizza in pizzas:
        pizza_dict = {
            'id': pizza.id,
            'name': pizza.name,
            'price': pizza.price,
            'image': pizza.image,
        }
        pizza_data.append(pizza_dict)

    context = {
        'pizza_data': pizza_data,
    }
    print(pizza_data)
    return render(request, "index.html", context)