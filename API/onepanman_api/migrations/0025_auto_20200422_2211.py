# Generated by Django 2.2.10 on 2020-04-22 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('onepanman_api', '0024_auto_20200420_2311'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinformationinproblem',
            name='score',
            field=models.IntegerField(db_column='SCORE', default=1000, verbose_name='점수'),
        ),
    ]
