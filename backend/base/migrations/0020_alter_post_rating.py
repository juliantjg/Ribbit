# Generated by Django 4.1.3 on 2022-11-27 23:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0019_alter_post_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='rating',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
