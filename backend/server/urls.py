from django.urls import path
from . import views
from .views import *
import sys

urlpatterns = [
    path('', views.report, name="report"),
    path('invoice/', views.invoice, name='invoice'),
    path('dc/', views.dc, name='dc'),
    path('input/', ReactView.as_view(), name='input'),
    path('inward-dc-input/', InwardDcInput.as_view(), name='inward-dc-input'),
    
]
