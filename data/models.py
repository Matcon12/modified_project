# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CustomerMaster(models.Model):
    cust_id = models.CharField(primary_key=True, max_length=4)
    cust_name = models.CharField(max_length=50, blank=True, null=True)
    cust_address = models.CharField(max_length=50, blank=True, null=True)
    cust_city = models.CharField(max_length=15, blank=True, null=True)
    cust_st_code = models.IntegerField(blank=True, null=True)
    cust_st_name = models.CharField(max_length=20, blank=True, null=True)
    cust_pin = models.CharField(max_length=6, blank=True, null=True)
    cust_gst_id = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer_master'


class GstRates(models.Model):
    cgst_rate = models.IntegerField(blank=True, null=True)
    sgst_rate = models.IntegerField(blank=True, null=True)
    igst_rate = models.IntegerField(blank=True, null=True)
    id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gst_rates'


class GstStateCode(models.Model):
    state_code = models.IntegerField(blank=True, null=True)
    state_name = models.CharField(max_length=70, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gst_state_code'


class InwDc(models.Model):
    grn_no = models.IntegerField(primary_key=True)  # The composite primary key (grn_no, fin_year, po_no, po_sl_no) found, that is not supported. The first column is selected.
    fin_year = models.CharField(max_length=10)
    grn_date = models.CharField(max_length=15, blank=True, null=True)
    po_no = models.IntegerField()
    po_date = models.CharField(max_length=15, blank=True, null=True)
    receiver_id = models.CharField(max_length=4, blank=True, null=True)
    consignee_id = models.CharField(max_length=4, blank=True, null=True)
    po_sl_no = models.IntegerField()
    cust_id = models.CharField(max_length=4, blank=True, null=True)
    part_id = models.IntegerField(blank=True, null=True)
    part_name = models.CharField(max_length=50, blank=True, null=True)
    qty_received = models.IntegerField(blank=True, null=True)
    purpose = models.CharField(max_length=50, blank=True, null=True)
    uom = models.CharField(max_length=5, blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)
    qty_deleivered = models.IntegerField(blank=True, null=True)
    qty_balance = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inw_dc'
        unique_together = (('grn_no', 'fin_year', 'po_no', 'po_sl_no'),)


class MatCompanies(models.Model):
    mat_code = models.CharField(max_length=3, blank=True, null=True)
    mat_name = models.CharField(max_length=50, blank=True, null=True)
    mat_address = models.CharField(max_length=50, blank=True, null=True)
    mat_gst_code = models.CharField(max_length=20, blank=True, null=True)
    bank_acc_no = models.CharField(max_length=15, blank=True, null=True)
    bank_name = models.CharField(max_length=30, blank=True, null=True)
    bank_address = models.CharField(max_length=50, blank=True, null=True)
    ifsc_code = models.CharField(max_length=20, blank=True, null=True)
    fin_yr = models.CharField(max_length=10, blank=True, null=True)
    last_gcn_no = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mat_companies'


class OtwDc(models.Model):
    mat_code = models.CharField(primary_key=True, max_length=3)  # The composite primary key (mat_code, gcn_no, fin_year, po_no, po_sl_no) found, that is not supported. The first column is selected.
    gcn_no = models.IntegerField()
    gcn_date = models.CharField(max_length=15, blank=True, null=True)
    grn_no = models.IntegerField(blank=True, null=True)
    fin_year = models.CharField(max_length=10)
    grn_date = models.CharField(max_length=15, blank=True, null=True)
    po_no = models.IntegerField()
    po_date = models.CharField(max_length=15, blank=True, null=True)
    receiver_id = models.CharField(max_length=4, blank=True, null=True)
    consignee_id = models.CharField(max_length=4, blank=True, null=True)
    po_sl_no = models.IntegerField()
    part_id = models.IntegerField(blank=True, null=True)
    part_name = models.CharField(max_length=50, blank=True, null=True)
    qty_deleivered = models.IntegerField(blank=True, null=True)
    uom = models.CharField(max_length=5, blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    taxable_amt = models.IntegerField(blank=True, null=True)
    cgst_price = models.IntegerField(blank=True, null=True)
    sgst_price = models.IntegerField(blank=True, null=True)
    igst_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'otw_dc'
        unique_together = (('mat_code', 'gcn_no', 'fin_year', 'po_no', 'po_sl_no'),)


class PartMaster(models.Model):
    part_id = models.IntegerField(primary_key=True)
    part_name = models.CharField(max_length=50, blank=True, null=True)
    cust = models.ForeignKey(CustomerMaster, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'part_master'


class Po(models.Model):
    po_no = models.IntegerField(primary_key=True)  # The composite primary key (po_no, fin_year, po_sl_no) found, that is not supported. The first column is selected.
    fin_year = models.CharField(max_length=10)
    po_date = models.CharField(max_length=15, blank=True, null=True)
    cust = models.ForeignKey(CustomerMaster, models.DO_NOTHING, blank=True, null=True)
    quote_ref_no = models.CharField(max_length=5, blank=True, null=True)
    receiver_id = models.CharField(max_length=4, blank=True, null=True)
    consignee_id = models.CharField(max_length=4, blank=True, null=True)
    po_sl_no = models.IntegerField()
    part_id = models.IntegerField(blank=True, null=True)
    qty = models.IntegerField(blank=True, null=True)
    uom = models.CharField(max_length=5, blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'po'
        unique_together = (('po_no', 'fin_year', 'po_sl_no'),)
