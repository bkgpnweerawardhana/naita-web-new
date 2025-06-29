# Generated by Django 5.2 on 2025-06-07 09:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Province',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('province', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='districts', to='locations.province')),
            ],
            options={
                'ordering': ['name'],
                'unique_together': {('name', 'province')},
            },
        ),
        migrations.CreateModel(
            name='DSDivision',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('district', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ds_divisions', to='locations.district')),
            ],
            options={
                'ordering': ['name'],
                'unique_together': {('name', 'district')},
            },
        ),
    ]
