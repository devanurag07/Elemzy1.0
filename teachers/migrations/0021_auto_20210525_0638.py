# Generated by Django 3.1.6 on 2021-05-25 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0020_auto_20210525_0621'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='fathers_name',
            field=models.CharField(max_length=100),
        ),
    ]
