# Generated by Django 3.1.6 on 2021-05-25 08:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0021_auto_20210525_0638'),
    ]

    operations = [
        migrations.CreateModel(
            name='Document',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=300)),
                ('document_file', models.FileField(upload_to='documents/')),
            ],
        ),
    ]
