from rest_framework import serializers
from .models import *

# class InvoiceForm(serializers.ModelSerializer):
#     class Meta:
#         model = Invoice
#         fields = '__all__'

class InwardDCForm(serializers.ModelSerializer):
    class Meta:
        model = InwDc
        fields = '__all__'

class CustomerMasterForm(serializers.ModelSerializer):
    class Meta:
        model = CustomerMaster
        fields = '__all__'
