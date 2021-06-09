# Generated by Django 3.1.5 on 2021-06-07 01:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0024_auto_20210605_0809'),
    ]

    operations = [
        migrations.CreateModel(
            name='GradedAssignment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('graded', models.IntegerField()),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='teachers.assignment')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teachers.student')),
            ],
            options={
                'db_table': 'graded_assignments',
            },
        ),
    ]
