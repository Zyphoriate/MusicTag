import os, sys, json, base64, time, uuid
sys.path.insert(0,'/tmp/mtw/rootfs/app')
os.environ['DJANGO_SETTINGS_MODULE']='django_vue_cli.settings'
import django; django.setup()
from django.conf import settings
print('== REST_FRAMEWORK ==')
print(settings.REST_FRAMEWORK)
print('\n== SIMPLE_JWT ==')
print(settings.SIMPLE_JWT)
print('\n== CSRF / CORS ==')
for k in ['CSRF_COOKIE_NAME','CSRF_TRUST_ALL_ORIGINS','CSRF_TRUSTED_ORIGINS','CORS_ALLOW_CREDENTIALS','CORS_ORIGIN_WHITELIST','ALLOWED_HOSTS']:
    print(k,'=',getattr(settings,k,None))
print('\n== MIDDLEWARE ==')
for m in settings.MIDDLEWARE: print(' ',m)
print('\n== SECRET_KEY (hardcoded in settings.so; env SECRET_KEY has no effect) ==')
print(settings.SECRET_KEY)
print('\n== URL routes (filtered) ==')
from django.urls import get_resolver
def walk(ps,prefix=''):
    for p in ps:
        pat=str(getattr(p,'pattern',''))
        if hasattr(p,'url_patterns'): walk(p.url_patterns,prefix+pat)
        else:
            cb=getattr(p,'callback',None); name=getattr(p,'name','')
            line=f'{prefix}{pat}\t{name}\t{getattr(cb,"__module__","")}.{getattr(cb,"__name__","")}'
            if any(k in line for k in ['auth','token','license','mcp','apigw','^api/','^rest/','^user/','user-','open_api']):
                print(line)
walk(get_resolver().url_patterns)
