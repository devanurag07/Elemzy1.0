# Generated by Django 3.1.5 on 2021-06-19 16:02

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0036_rankingdocument_created_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='rankingdocument',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 6, 19, 16, 2, 38, 774708, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
