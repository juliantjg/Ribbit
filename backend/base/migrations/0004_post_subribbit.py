# Generated by Django 4.0.1 on 2022-02-11 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_remove_post_category_alter_post_content_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='subRibbit',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
