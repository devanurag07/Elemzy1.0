# Generated by Django 3.1.6 on 2021-05-24 07:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0017_auto_20210524_0736'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='firstname',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='lastname',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
