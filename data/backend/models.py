from django.db import models 

class CustomerMaster(models.Model):
    cust_id = models.CharField(primary_key=True, max_length=4)
    cust_name = models.CharField(max_length=50, blank=True, null=True)
    cust_addr1 = models.CharField(max_length=50, blank=True, null=True)
    cust_addr2 = models.CharField(max_length=50, blank=True, null=True)
    cust_city = models.CharField(max_length=15, blank=True, null=True)
    cust_st_code = models.IntegerField(blank=True, null=True)
    cust_st_name = models.CharField(max_length=20, blank=True, null=True)
    cust_pin = models.CharField(max_length=6, blank=True, null=True)
    cust_gst_id = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'customer_master'
class PartMaster(models.Model):
    part_id = models.IntegerField(primary_key=True)
    part_name = models.CharField(max_length=50, blank=True, null=True)
    cust_id = models.ForeignKey(CustomerMaster, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'part_master'


class Po(models.Model):
    po_no = models.IntegerField(primary_key=True)  
    po_date = models.DateField(max_length=15, blank=True, null=True)
    open_no=models.BooleanField()
    open_po_validity=models.DateField(max_length=15, blank=True, null=True)
    cust_id = models.ForeignKey(CustomerMaster, models.DO_NOTHING, blank=True, null=True)
    quote_ref_no = models.CharField(max_length=5, blank=True, null=True)
    receiver_id = models.CharField(max_length=4, blank=True, null=True)
    consignee_id = models.CharField(max_length=4, blank=True, null=True)
    po_sl_no = models.IntegerField()
    part_id = models.IntegerField(blank=True, null=True)
    qty = models.IntegerField(blank=True, null=True)
    qty_sent=models.IntegerField(blank=True, null=True)
    uom = models.CharField(max_length=5, blank=True, null=True)
    unit_price = models.IntegerField(blank=True, null=True)
    total_price = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'po'
        unique_together = (('po_no',  'po_sl_no'),)

class InwDc(models.Model):
    grn_no = models.IntegerField(primary_key=True) 
    grn_date = models.DateField(max_length=15, blank=True, null=True)
    rework_dc=models.BooleanField()
    po_no = models.IntegerField()
    po_date = models.DateField(max_length=15, blank=True, null=True)
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
    qty_delivered = models.IntegerField(blank=True, null=True)
    qty_balance = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'inw_dc'
        unique_together = (('grn_no',  'po_no', 'po_sl_no'),)


class MatCompanies(models.Model):
    mat_code = models.CharField(max_length=3, null=False,primary_key=True)
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
        managed = True
        db_table = 'mat_companies'


class OtwDc(models.Model):
    mat_code = models.CharField(primary_key=True, max_length=3) 
    gcn_no = models.CharField(max_length=15, blank=True, null=True)
    gcn_date = models.DateField(max_length=15, blank=True, null=True)
    grn_no = models.IntegerField(blank=True, null=True)
    grn_date = models.CharField(max_length=15, blank=True, null=True)
    po_no = models.IntegerField()
    po_date = models.DateField(max_length=15, blank=True, null=True)
    receiver_id = models.CharField(max_length=4, blank=True, null=True)
    consignee_id = models.CharField(max_length=4, blank=True, null=True)
    po_sl_no = models.IntegerField()
    part_id = models.IntegerField(blank=True, null=True)
    part_name = models.CharField(max_length=50, blank=True, null=True)
    qty_delivered = models.IntegerField(blank=True, null=True)
    uom = models.CharField(max_length=5, blank=True, null=True)
    unit_price = models.DecimalField(blank=True, null=True,max_digits=10, decimal_places=2)
    taxable_amt = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
    cgst_price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
    sgst_price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=2)
    igst_price = models.DecimalField(blank=True, null=True, max_digits=10, decimal_places=3)
    

    class Meta:
        managed = True
        db_table = 'otw_dc'
        unique_together = (('mat_code', 'gcn_no', 'po_no', 'po_sl_no'),)


class GstRates(models.Model):
    cgst_rate = models.IntegerField(blank=True, null=True)
    sgst_rate = models.IntegerField(blank=True, null=True)
    igst_rate = models.IntegerField(blank=True, null=True)
    id = models.IntegerField(null=False,primary_key=True)

    class Meta:
        managed = True
        db_table = 'gst_rates'


class GstStateCode(models.Model):
    state_code = models.IntegerField(null=False,primary_key=True)
    state_name = models.CharField(max_length=70, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'gst_state_code'