# Generated by Django 4.0.1 on 2022-11-13 23:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0017_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='title',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
