# Generated by Django 4.2.6 on 2023-10-26 10:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_alter_po_open_po_validity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='po',
            name='open_po_validity',
            field=models.DateField(blank=True, null=True),
        ),
    ]
