from django.urls import path
from . import views
from .views import *
import sys

urlpatterns = [
    path('', views.report, name="report"),
    path('invoice/', views.invoice_print, name='invoice'),
    path('dc/', views.dc_print, name='dc'),
    path('invoice-processing/', InvoiceProcessing.as_view(), name='invoice-processing'),
    path('inward-dc-input/', InwardDcInput.as_view(), name='inward-dc-input'),
    path('customer-master-input/', CustomerMasterInput.as_view(), name='customer-master-input'),
    path('purchase-order-input/', PurchaseOrderInput.as_view(), name='purchase-order-input'),
    path('part-master-input/', PartMasterInput.as_view(), name='part-master-input'),
    
]
