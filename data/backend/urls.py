from django.urls import path
from backend import views 
import sys
print(sys.path)


urlpatterns = [
    path('', views.home,name='home'),
    #  path('', views.dc,name='dc')
]
