# Generated by Django 3.1.5 on 2021-06-20 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0037_rankingdocument_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='chapter_no',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
