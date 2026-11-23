import os,sys,json,base64,time,uuid
sys.path.insert(0,'/tmp/mtw/rootfs/app'); os.environ['DJANGO_SETTINGS_MODULE']='django_vue_cli.settings'
import django; django.setup()
from django.test import Client
from django.contrib.auth.models import User
from django.conf import settings
import jwt
u=User.objects.filter(username='normal').first() or User.objects.create_user('normal','n@b.c','pw123456')
if u.password in ('','!') or not u.check_password('pw123456'): u.set_password('pw123456'); u.save()
c=Client()
r=c.post('/apimt/token/',data=json.dumps({'username':'normal','password':'pw123456'}),content_type='application/json')
print('== POST /apimt/token/ ==')
print('HTTP',r.status_code); print(r.content.decode()[:1000])
tok=r.json().get('token')
print('\n== access token header/payload ==')
for i,p in enumerate(tok.split('.')):
    print(i, base64.urlsafe_b64decode(p+'='*(-len(p)%4)).decode('utf8','replace'))
print('\n== login failure ==')
r2=c.post('/apimt/token/',data=json.dumps({'username':'normal','password':'bad'}),content_type='application/json')
print('HTTP',r2.status_code,r2.content.decode())
print('\n== /user/info/ with JWT ==')
r3=Client(HTTP_AUTHORIZATION='JWT '+tok).get('/user/info/')
print('HTTP',r3.status_code,r3.content.decode()[:800])
print('\n== forged JWT with baked-in SECRET_KEY ==')
payload={'token_type':'access','exp':int(time.time())+3600,'iat':int(time.time()),'jti':uuid.uuid4().hex,'user_id':u.id}
forged=jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
r4=Client(HTTP_AUTHORIZATION='JWT '+forged).get('/user/info/')
print('forged token accepted:', r4.status_code==200, 'HTTP',r4.status_code)
print(r4.content.decode()[:300])
print('\n== server Set-Cookie on login ==')
print('cookies:', dict(r.cookies))
