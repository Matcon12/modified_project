from django.shortcuts import render
from django.db.models import Sum
from .models import CustomerMaster,MatCompanies ,OtwDc,GstRates
from django.shortcuts import get_object_or_404
from babel.numbers import format_currency
def report(request):
    return render(request,'reports.html')   
def invoice(request):
    odc=OtwDc.objects.filter(gcn_no='76/2023-24')
    odc1=get_object_or_404(OtwDc,po_sl_no='1',gcn_no='76/2023-24')
    mat= odc1.mat_code
    m=MatCompanies.objects.get(mat_code=mat)
    # mat =get_object_or_404(MatCompanies,mat_code='MEE')
    # r_id=get_object_or_404(CustomerMaster,cust_id='hite')
    r_id = odc1.receiver_id
    r = CustomerMaster.objects.get(cust_id=r_id)
    # c_id=get_object_or_404(CustomerMaster,cust_id='alst')
    c_id=odc1.consignee_id
    c=CustomerMaster.objects.get(cust_id=c_id)
    gr=get_object_or_404(GstRates,id=1)
    total_qty = OtwDc.objects.filter(gcn_no='76/2023-24').aggregate(total_qty=Sum('qty_delivered'))['total_qty']
    total_taxable_value =OtwDc.objects.filter(gcn_no='76/2023-24').aggregate(total_taxable_value=Sum('taxable_amt'))['total_taxable_value']
    total_cgst = OtwDc.objects.filter(gcn_no='76/2023-24').aggregate(total_cgst=Sum('cgst_price'))['total_cgst']
    total_sgst = OtwDc.objects.filter(gcn_no='76/2023-24').aggregate(total_sgst=Sum('sgst_price'))['total_sgst']
    total_igst = OtwDc.objects.filter(gcn_no='76/2023-24').aggregate(total_igst=Sum('igst_price'))['total_igst']
    grand_total= round(float('{:.2f}'.format(total_taxable_value+total_cgst+total_sgst+total_igst)))
    gt=format_currency(grand_total, 'INR', locale='en_IN')
    # # Qty = get_object_or_404(OtwDc,part_id='2').qty_delivered
    # print(type(odc1.cgst_price),"cgst_price")  
    # print(type(total_cgst),"Type of Total cgst") 
    aw = convert_rupees_to_words(grand_total) 
    # print(r_id,"reciver_id")
    # print(c_id,"consignee_id")
    # print(r.cust_id, "r_id")
    # print(r.cust_name, "r_name")
    # print(r.cust_st_code, "r_cust_st_code")
    # print(c.cust_id, "r_id")
    # print(c.cust_name, "r_name")
    # print(c.cust_st_code, "r_cust_st_code")
    
    context = {
        'odc':odc,
        'm':m,
        'r':r,
        'c':c,
        'gr':gr,
        'odc1':odc1,
        'amount' : aw,
        'total_taxable_value':"{:.2f}".format(total_taxable_value),
        'total_cgst':"{:.2f}".format(total_cgst),
        'total_sgst':"{:.2f}".format(total_sgst),
        'total_igst':"{:.2f}".format(total_igst),
        'gt':gt,
        'total_qty':total_qty,  
    }  
    return render(request, 'tax_invoice.html', context)

def dc(request):
    odc=OtwDc.objects.filter(gcn_no='76/2023-24')
    # mat =get_object_or_404(MatCompanies,mat_code='MEE')
    # c=get_object_or_404(CustomerMaster,cust_id='hite')
    odc1=get_object_or_404(OtwDc,po_sl_no='1',gcn_no='76/2023-24')
    c_id=odc1.consignee_id
    c=CustomerMaster.objects.get(cust_id=c_id)
    r_id = odc1.receiver_id
    r = CustomerMaster.objects.get(cust_id=r_id)
    mat= odc1.mat_code
    m=MatCompanies.objects.get(mat_code=mat)
    context = {
        'm':m,
        'c':c,
        'r':r,
        'odc1':odc1,
        'odc':odc,
       
    }  
    return render(request,'dc.html',context)
    

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
    # print(type(amount))
   
    RsPs = str(amount).split('.')
    Rs = int(RsPs[0])
    Ps = int(RsPs[1])
    # print(Rs)
    # print(Ps)
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


   