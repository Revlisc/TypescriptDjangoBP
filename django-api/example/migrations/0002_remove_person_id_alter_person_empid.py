# Generated by Django 5.1.2 on 2024-10-27 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('example', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='person',
            name='id',
        ),
        migrations.AlterField(
            model_name='person',
            name='empid',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]
