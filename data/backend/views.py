from django.shortcuts import render
from django.db.models import Sum
from .models import CustomerMaster,MatCompanies ,OtwDc,GstRates,GstStateCode
from django.shortcuts import get_object_or_404
#pip3 install Babel

from babel.numbers import format_currency


def home(request):
    odc=OtwDc.objects.filter(gcn_no=75)
    odc1=get_object_or_404(OtwDc,po_sl_no='1',gcn_no=75)
    mat =get_object_or_404(MatCompanies,mat_code='MEE')
    cust=get_object_or_404(CustomerMaster,cust_id='sidr')
    cust1=get_object_or_404(CustomerMaster,cust_id='sidr')
    gr=get_object_or_404(GstRates,id=1)
    gsc=get_object_or_404(GstStateCode,state_code=33)
    
    gsc1=cust.cust_st_code
    print(gsc1)
    
    total_qty = OtwDc.objects.filter(gcn_no=75).aggregate(total_qty=Sum('qty_delivered'))['total_qty']
    total_taxable_value = OtwDc.objects.filter(gcn_no=75).aggregate(total_taxable_value=Sum('taxable_amt'))['total_taxable_value']
    total_cgst = OtwDc.objects.filter(gcn_no=75).aggregate(total_cgst=Sum('cgst_price'))['total_cgst']
    total_sgst = OtwDc.objects.filter(gcn_no=75).aggregate(total_sgst=Sum('sgst_price'))['total_sgst']
    total_igst = OtwDc.objects.filter(gcn_no=75).aggregate(total_igst=Sum('igst_price'))['total_igst']
    grand_total= float('{:.2f}'.format(total_taxable_value+total_cgst+total_sgst+total_igst))
    gt=format_currency(grand_total, 'INR', locale='en_IN')
    # # Qty = get_object_or_404(OtwDc,part_id='2').qty_delivered
    # # print(odc1.qty_delivered)    
    aw = convert_rupees_to_words(grand_total)
    context = {
        'odc':odc,
        'mat':mat,
        'cust':cust,
        'cust1':cust1,
        'gr':gr,
        'odc1':odc1,
        'amount' : aw,
        'gsc':gsc,
        'total_taxable_value':"{:.2f}".format(total_taxable_value),
        'total_cgst':"{:.2f}".format(total_cgst),
        'total_sgst':"{:.2f}".format(total_sgst),
        'total_igst':"{:.2f}".format(total_igst),
        'gt':gt,
        'total_qty':total_qty,
        
    }  
    return render(request, 'tax_invoice.html', context)
    
    
def convert_rupees_to_words(amount):
    ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", 
            "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen","Seventeen", "Eighteen", "Nineteen"]
    tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
    thousands = ["", "Thousand", "Lakh", "Crore"]
    def convert_two_digits(num):
        if num < 20:
            return ones[num] + " "
        else:
            return tens[num // 10] + " " + ones[num % 10]
    def convert_three_digits(num):
        if num < 100:
            return convert_two_digits(num)
        else:
            return ones[num // 100] + " Hundred " + convert_two_digits(num % 100)
    result = ""    
    amount = format(amount, ".2f")
    print(type(amount))
   
    RsPs = str(amount).split('.')
    Rs = int(RsPs[0])
    Ps = int(RsPs[1])
    print(Rs)
    print(Ps)
    if Rs == 0:
        result += "Zero "
    else:
        for i in range(4):
            if i == 0 or i == 3:
                chunk = Rs % 1000
                Rs //= 1000
            else:
                chunk = Rs % 100
                Rs //= 100
            if chunk != 0:
                result = convert_three_digits(chunk) + " " + thousands[i] + " " +result
    if Ps > 0:
        result = result.strip() + " and Paise " + convert_two_digits(Ps)
        
    result = "Rupees " + result.strip() + " Only"
    print("conversion success")
    return result.upper()


   