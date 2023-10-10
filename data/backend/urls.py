from django.urls import path
from backend import views 
import sys
print(sys.path)


urlpatterns = [
    path('', views.report, name="report"),
    path('invoice/', views.invoice, name='invoice'),  # Updated URL pattern
    path('dc/', views.dc, name='dc'), 
    
]
