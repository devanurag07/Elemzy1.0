# Generated by Django 3.1.6 on 2021-05-25 04:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0018_auto_20210524_0737'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='studentId',
        ),
        migrations.AddField(
            model_name='student',
            name='student_id',
            field=models.PositiveBigIntegerField(blank=True, null=True),
        ),
    ]
