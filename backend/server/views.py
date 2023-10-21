from django.shortcuts import render,HttpResponse
from rest_framework import status
from django.http import JsonResponse
from django.db.models import Sum
from .models import *
from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.parsers import JSONParser
from django.shortcuts import render 
from rest_framework.views import APIView 
from . models import *
from rest_framework.response import Response 
from . serializer import *
#pip3 install Babel

from babel.numbers import format_currency

def report(request):
    return render(request,'reports.html')
    
def invoice_print(request):
    odc=OtwDc.objects.filter(gcn_no=73)
    odc1=get_object_or_404(OtwDc,po_sl_no='1',gcn_no=73)
    mat =get_object_or_404(MatCompanies,mat_code='MEE')
    cust=get_object_or_404(CustomerMaster,cust_id='macr')
    cust1=get_object_or_404(CustomerMaster,cust_id='macr')
    gr=get_object_or_404(GstRates,id=1)
    gsc=get_object_or_404(GstStateCode,state_code=33)
    total_qty = OtwDc.objects.filter(gcn_no=73).aggregate(total_qty=Sum('qty_delivered'))['total_qty']
    total_taxable_value =OtwDc.objects.filter(gcn_no=73).aggregate(total_taxable_value=Sum('taxable_amt'))['total_taxable_value']
    total_cgst = OtwDc.objects.filter(gcn_no=73).aggregate(total_cgst=Sum('cgst_price'))['total_cgst']
    total_sgst = OtwDc.objects.filter(gcn_no=73).aggregate(total_sgst=Sum('sgst_price'))['total_sgst']
    total_igst = OtwDc.objects.filter(gcn_no=73).aggregate(total_igst=Sum('igst_price'))['total_igst']
    grand_total= float('{:.2f}'.format(total_taxable_value+total_cgst+total_sgst+total_igst))
    gt=format_currency(grand_total, 'INR', locale='en_IN')
    print(type(odc1.cgst_price),"cgst_price")  
    print(type(total_cgst),"Type of Total cgst") 
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

def dc_print(request):
    odc=OtwDc.objects.filter(gcn_no=73)
    mat =get_object_or_404(MatCompanies,mat_code='MEE')
    cust1=get_object_or_404(CustomerMaster,cust_id='macr')
    odc1=get_object_or_404(OtwDc,po_sl_no='1',gcn_no=73)
    context = {
        'mat':mat,
        'cust1':cust1,
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

class InvoiceProcessing(APIView):    
    # serializer_class = InvoiceForm  
    def get(self, request): 
        data = {'message': 'Hello, world!'}
        return JsonResponse(data)  
    def post(self, request):
        # print('post request received')  
        # serializer = InvoiceForm(data=request.data)
        s = 'item'+'0'
        print(request.data)
        # print(serializer, 'this is serializer')
        if serializer.is_valid():
            invoice(request)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InwardDcInput(APIView): 
    def post(self, request):
        serializer = InwardDCForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            # print('saved to database')
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerMasterInput(APIView):
    def post(self, request):
        serializer = CustomerMasterForm(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def invoice_processing(request):
    grn_no = request.data['grn_no']
    query_set = InwDc.objects.filter(grn_no=grn_no)

    if query_set.exists():
        po_sl_numbers = []
        for i in range(request.data['items']):
            item = 'item'+str(i)
            po_sl_no = request.data['item']['po_sl_no']
            qty_delivered = request.data['item']['qty_delivered']
            po_sl_numbers = append(po_sl_no)

            # try:
            #      = InwDc.objects.get(grn_no=grn_no, po_sl_no=po_sl_no)
            # except:
            #     print("Specified PO Serial Number Doesnt exist")

            po_sl_no = get_object_or_404(InwDC, grn_no=grn, po_sl_no=po_sl_no).po_sl_no

            if po_sl_no :
                balance_qty = query_set.qty_balance
                po_no = query_set.po_no
                qty = get_object_or_404(PO, po_no=po_no, po_sl_no=po_sl_no).qty
                qty_sent = get_object_or_404(PO, po_no=po_no, po_sl_no=po_sl_no).qty_sent
                rework_dc = query_set.reword_dc
                grn_date = query_set.grn_date
                open_po = get_object_or_404(PO, po_no=po_no, po_sl_no=po_sl_no)
                open_po_validty = get_object_or_404(PO, po_no=po_no, po_sl_no=po_sl_no)


                





