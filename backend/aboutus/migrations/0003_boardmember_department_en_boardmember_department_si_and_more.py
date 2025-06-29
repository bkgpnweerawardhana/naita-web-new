# Generated by Django 5.2 on 2025-06-17 05:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('aboutus', '0002_objective_qualitypolicy'),
    ]

    operations = [
        migrations.AddField(
            model_name='boardmember',
            name='department_en',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='department_si',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='name_en',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='name_si',
            field=models.CharField(max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='position_en',
            field=models.CharField(choices=[('minister', 'Minister of Education'), ('deputy', 'Deputy Minister'), ('director', 'Director General'), ('management', 'Top Management')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='position_si',
            field=models.CharField(choices=[('minister', 'Minister of Education'), ('deputy', 'Deputy Minister'), ('director', 'Director General'), ('management', 'Top Management')], max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='role_en',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='boardmember',
            name='role_si',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='objective',
            name='description_en',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='objective',
            name='description_si',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='qualitypolicy',
            name='content_en',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='qualitypolicy',
            name='content_si',
            field=models.TextField(null=True),
        ),
    ]
