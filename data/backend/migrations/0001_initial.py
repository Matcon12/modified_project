# Generated by Django 4.2.5 on 2023-10-06 06:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerMaster',
            fields=[
                ('cust_id', models.CharField(max_length=4, primary_key=True, serialize=False)),
                ('cust_name', models.CharField(blank=True, max_length=50, null=True)),
                ('cust_address', models.CharField(blank=True, max_length=50, null=True)),
                ('cust_city', models.CharField(blank=True, max_length=15, null=True)),
                ('cust_st_code', models.IntegerField(blank=True, null=True)),
                ('cust_st_name', models.CharField(blank=True, max_length=20, null=True)),
                ('cust_pin', models.CharField(blank=True, max_length=6, null=True)),
                ('cust_gst_id', models.CharField(blank=True, max_length=20, null=True)),
            ],
            options={
                'db_table': 'customer_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GstRates',
            fields=[
                ('cgst_rate', models.IntegerField(blank=True, null=True)),
                ('sgst_rate', models.IntegerField(blank=True, null=True)),
                ('igst_rate', models.IntegerField(blank=True, null=True)),
                ('id', models.IntegerField(primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'gst_rates',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='GstStateCode',
            fields=[
                ('state_code', models.IntegerField(primary_key=True, serialize=False)),
                ('state_name', models.CharField(blank=True, max_length=70, null=True)),
            ],
            options={
                'db_table': 'gst_state_code',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='InwDc',
            fields=[
                ('grn_no', models.IntegerField(primary_key=True, serialize=False)),
                ('fin_year', models.CharField(max_length=10)),
                ('grn_date', models.CharField(blank=True, max_length=15, null=True)),
                ('po_no', models.IntegerField()),
                ('po_date', models.CharField(blank=True, max_length=15, null=True)),
                ('receiver_id', models.CharField(blank=True, max_length=4, null=True)),
                ('consignee_id', models.CharField(blank=True, max_length=4, null=True)),
                ('po_sl_no', models.IntegerField()),
                ('cust_id', models.CharField(blank=True, max_length=4, null=True)),
                ('part_id', models.IntegerField(blank=True, null=True)),
                ('part_name', models.CharField(blank=True, max_length=50, null=True)),
                ('qty_received', models.IntegerField(blank=True, null=True)),
                ('purpose', models.CharField(blank=True, max_length=50, null=True)),
                ('uom', models.CharField(blank=True, max_length=5, null=True)),
                ('unit_price', models.IntegerField(blank=True, null=True)),
                ('total_price', models.IntegerField(blank=True, null=True)),
                ('qty_deleivered', models.IntegerField(blank=True, null=True)),
                ('qty_balance', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'inw_dc',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='MatCompanies',
            fields=[
                ('mat_code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('mat_name', models.CharField(blank=True, max_length=50, null=True)),
                ('mat_address', models.CharField(blank=True, max_length=50, null=True)),
                ('mat_gst_code', models.CharField(blank=True, max_length=20, null=True)),
                ('bank_acc_no', models.CharField(blank=True, max_length=15, null=True)),
                ('bank_name', models.CharField(blank=True, max_length=30, null=True)),
                ('bank_address', models.CharField(blank=True, max_length=50, null=True)),
                ('ifsc_code', models.CharField(blank=True, max_length=20, null=True)),
                ('fin_yr', models.CharField(blank=True, max_length=10, null=True)),
                ('last_gcn_no', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'mat_companies',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='OtwDc',
            fields=[
                ('mat_code', models.CharField(max_length=3, primary_key=True, serialize=False)),
                ('gcn_no', models.IntegerField()),
                ('gcn_date', models.CharField(blank=True, max_length=15, null=True)),
                ('grn_no', models.IntegerField(blank=True, null=True)),
                ('fin_year', models.CharField(max_length=10)),
                ('grn_date', models.CharField(blank=True, max_length=15, null=True)),
                ('po_no', models.IntegerField()),
                ('po_date', models.CharField(blank=True, max_length=15, null=True)),
                ('receiver_id', models.CharField(blank=True, max_length=4, null=True)),
                ('consignee_id', models.CharField(blank=True, max_length=4, null=True)),
                ('po_sl_no', models.IntegerField()),
                ('part_id', models.IntegerField(blank=True, null=True)),
                ('part_name', models.CharField(blank=True, max_length=50, null=True)),
                ('qty_deleivered', models.IntegerField(blank=True, null=True)),
                ('uom', models.CharField(blank=True, max_length=5, null=True)),
                ('unit_price', models.IntegerField(blank=True, null=True)),
                ('taxable_amt', models.IntegerField(blank=True, null=True)),
                ('cgst_price', models.IntegerField(blank=True, null=True)),
                ('sgst_price', models.IntegerField(blank=True, null=True)),
                ('igst_price', models.IntegerField(blank=True, null=True)),
                ('total_price', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'otw_dc',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='PartMaster',
            fields=[
                ('part_id', models.IntegerField(primary_key=True, serialize=False)),
                ('part_name', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'part_master',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Po',
            fields=[
                ('po_no', models.IntegerField(primary_key=True, serialize=False)),
                ('fin_year', models.CharField(max_length=10)),
                ('po_date', models.CharField(blank=True, max_length=15, null=True)),
                ('quote_ref_no', models.CharField(blank=True, max_length=5, null=True)),
                ('receiver_id', models.CharField(blank=True, max_length=4, null=True)),
                ('consignee_id', models.CharField(blank=True, max_length=4, null=True)),
                ('po_sl_no', models.IntegerField()),
                ('part_id', models.IntegerField(blank=True, null=True)),
                ('qty', models.IntegerField(blank=True, null=True)),
                ('uom', models.CharField(blank=True, max_length=5, null=True)),
                ('unit_price', models.IntegerField(blank=True, null=True)),
                ('total_price', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'po',
                'managed': False,
            },
        ),
    ]
