# Generated by Django 4.2.6 on 2023-10-13 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0003_alter_po_unique_together_po_open_po_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='po',
            name='po_no',
            field=models.CharField(max_length=15, primary_key=True, serialize=False),
        ),
    ]