from django.contrib import admin
from django.apps import apps
from django.contrib.admin.sites import AlreadyRegistered
# Register your models here.

def autoRegister():
    modelList = apps.get_app_config('eventsAPI').get_models()
    for model in modelList:
        try:
            admin.site.register(model)
        except AlreadyRegistered:
            pass

autoRegister()
