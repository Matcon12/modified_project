# Generated by Django 4.2 on 2023-10-28 07:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("server", "0006_otwdc_rejected_item"),
    ]

    operations = [
        migrations.AlterField(
            model_name="otwdc", name="gcn_no", field=models.CharField(max_length=15),
        ),
    ]