from django.urls import path
from . import views
from .views import *
import sys

urlpatterns = [
    path('invoice-print/', views.invoice_print, name='invoice'),
    path('dc-print/', views.dc_print, name='dc'),
    path('reports-printing/', ReportsPrint.as_view(), name='reports-printing'),
    path('invoice-processing/', InvoiceProcessing.as_view(), name='invoice-processing'),
    path('inward-dc-input/', InwardDcInput.as_view(), name='inward-dc-input'),
    path('customer-master-input/', CustomerMasterInput.as_view(), name='customer-master-input'),
    path('purchase-order-input/', PurchaseOrderInput.as_view(), name='purchase-order-input'),
    path('part-master-input/', PartMasterInput.as_view(), name='part-master-input'),
    path("login/",LoginPage.as_view(),name='login'),
    path('logout/',LogoutPage.as_view(),name='logout'),
    path("signup/", SignUpPage.as_view(),name='signup'),
    
]
