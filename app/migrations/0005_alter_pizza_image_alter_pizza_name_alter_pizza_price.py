# Generated by Django 4.2.7 on 2023-11-04 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0004_alter_pizza_image_alter_pizza_name_alter_pizza_price"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pizza",
            name="image",
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name="pizza",
            name="name",
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name="pizza",
            name="price",
            field=models.FloatField(),
        ),
    ]
