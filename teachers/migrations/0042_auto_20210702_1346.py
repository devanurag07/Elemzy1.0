# Generated by Django 3.1.5 on 2021-07-02 13:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0041_leaverequest'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='leaverequest',
            table='leave_requests',
        ),
    ]
