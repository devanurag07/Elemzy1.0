# Generated by Django 3.1.6 on 2021-05-03 10:21

import datetime
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0005_auto_20210502_1247'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='classroom',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 5, 3, 10, 20, 42, 289828, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='student',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 5, 3, 10, 20, 51, 26124, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teacher',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 5, 3, 10, 21, 2, 986706, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='teachermembership',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 5, 3, 10, 21, 15, 843308, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='SubjectMarks',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=30)),
                ('marks', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('student_profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teachers.studentprofile')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='marks', to='teachers.teacher')),
            ],
        ),
        migrations.AddField(
            model_name='studentprofile',
            name='classroom',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teachers.classroom'),
        ),
        migrations.AddField(
            model_name='studentprofile',
            name='student',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='student', to='teachers.student'),
        ),
        migrations.AddField(
            model_name='studentprofile',
            name='teacher',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='profiles', to='teachers.teacher'),
        ),
    ]
