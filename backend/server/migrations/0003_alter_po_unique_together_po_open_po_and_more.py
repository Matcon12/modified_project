# Generated by Django 4.2.6 on 2023-10-13 10:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('server', '0002_alter_otwdc_unique_together_remove_otwdc_fin_year'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='po',
            unique_together={('po_no', 'po_sl_no')},
        ),
        migrations.AddField(
            model_name='po',
            name='open_po',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='po',
            name='open_po_validty',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
        migrations.AddField(
            model_name='po',
            name='qty_sent',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.RemoveField(
            model_name='po',
            name='fin_year',
        ),
    ]