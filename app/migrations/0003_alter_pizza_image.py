# Generated by Django 4.2.7 on 2023-11-04 16:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_alter_pizza_image"),
    ]

    operations = [
        migrations.AlterField(
            model_name="pizza",
            name="image",
            field=models.CharField(max_length=500),
        ),
    ]
