import os,sys,json,base64,time,hashlib
sys.path.insert(0,'/tmp/mtw/rootfs/app'); os.environ['DJANGO_SETTINGS_MODULE']='django_vue_cli.settings'
import django; django.setup()
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
import applications.user.utils as U, applications.user.license_crypto as LC, applications.permission.utils as P, applications.task.models as TM
import requests
from cryptography.hazmat.primitives.asymmetric import rsa,padding
from cryptography.hazmat.primitives import hashes,serialization

print('== V1_VIEW_LIST (permission.constans) ==')
import applications.permission.constans as C
print(C.V1_VIEW_LIST)

# V2 key + blob
key=rsa.generate_private_key(public_exponent=65537,key_size=2048)
settings.LICENSE_PUBLIC_KEY=key.public_key().public_bytes(serialization.Encoding.PEM,serialization.PublicFormat.SubjectPublicKeyInfo).decode()
def b64u(b): return base64.urlsafe_b64encode(b).rstrip(b'=').decode()
mac=U.get_mac_address(); ch='docker'
def mk(p):
    b=json.dumps(p,separators=(',',':'),sort_keys=True).encode()
    return b64u(b)+'.'+b64u(key.sign(b,padding.PKCS1v15(),hashes.SHA256()))
base={'schema_version':'signed_v1','expires_at':int(time.time())+86400,'license_mac':mac,'license_channel':ch,'role':'V2'}
print('\n== V2 signed license blob format ==')
print('blob = urlsafe_b64(payload_json) + "." + urlsafe_b64(RSA-PKCS1v15-SHA256(payload_json))')
print('payload example =', base)
print('\n== V2 verification matrix ==')
cases=[('valid',base),('schema mismatch',dict(base,schema_version='signed_v2')),('missing schema',{k:v for k,v in base.items() if k!='schema_version'}),
       ('missing expires_at',{k:v for k,v in base.items() if k!='expires_at'}),('expired',dict(base,expires_at=int(time.time())-10)),
       ('wrong license_mac (not enforced)',dict(base,license_mac='00:11:22:33:44:55')),('wrong license_channel (not enforced)',dict(base,license_channel='app'))]
for name,p in cases:
    print(f'{name:42s}', LC.verify_signed_license_blob(mk(p), expected_mac_address=mac, expected_channel=ch))
print('bad signature'.ljust(42), LC.verify_signed_license_blob(b64u(json.dumps(base,separators=(",",":"),sort_keys=True).encode())+'.'+b64u(b'x'*256)))

# V1 online verify capture
class Resp:
    def __init__(self,obj): self.obj=obj; self.status_code=200; self.text=json.dumps(obj)
    def json(self): return self.obj
cap={}
def fake_post(url,**kw):
    cap['url']=url; cap['data']=kw.get('data'); cap['headers']=kw.get('headers'); return Resp(cap.get('obj',{}))
requests.post=fake_post
print('\n== V1 legacy/online verify request (verify_code, mode=runtime) ==')
TM.SysSettings.objects.all().delete()
for k,v in [('raw_code','RAWCODE'),('code','CODE')]: TM.SysSettings.objects.create(key=k,value=v)
cap['obj']={'result':True,'message':'ok','data':{}}
print('state =>',U.get_runtime_license_state(force_refresh=True))
print('POST URL:',cap.get('url'))
print('POST body:',cap.get('data'))
print('POST headers:',cap.get('headers'))
print('sign = sha256(salt + code + mac_address + timestamp), salt = ahsdok1238uasdjklxcjzxc9098qsacharles')
print('IAM response must contain data.license_blob + data.license_schema; otherwise:', U.verify_code('RAWCODE',mode='runtime',fail_open=False))

# permission matrix
print('\n== IamPermission matrix (view basename/action) ==')
rf=APIRequestFactory()
class V:
    def __init__(self,basename,action): self.basename=basename; self.action=action
def req(user):
    r=rf.get('/apimt/'); r.user=user; return r
u=User.objects.filter(username='normal').first() or User.objects.create_user('normal','n@b.c','pw123456')
admin=User.objects.filter(is_superuser=True).first()
if not admin: admin=User.objects.create_superuser('admin','a@b.c','pw123456')
actions=[('task','file_list'),('task','delete_files'),('user','info'),('sys','list'),('task','task_file_list'),('music','album')]
for role,keys in [('V1',[('raw_code','RAW')]),('V2',[('code','CODE'),('raw_code','RAW'),('license_blob',mk(base)),('license_schema','signed_v1')])]:
    TM.SysSettings.objects.all().delete()
    for k,v in keys: TM.SysSettings.objects.create(key=k,value=v)
    print('--- instance role:',U.get_runtime_role(force_refresh=True))
    for user in [u,admin]:
        for b,a in actions:
            try: r=P.IamPermission().has_permission(req(user),V(b,a))
            except Exception as e: r='EXC '+type(e).__name__+' '+str(e)[:80]
            print(f'  {user.username:8s} {b+"_"+a:24s} => {r}')
print('  anonymous any =>',P.IamPermission().has_permission(req(type('A',(),{'is_authenticated':False})()),V('task','file_list')))

# access token matrix
print('\n== AccessTokenPermission (SysSettings.access_token) ==')
for tok in ['', 'abc']:
    TM.SysSettings.objects.all().delete()
    if tok: TM.SysSettings.objects.create(key='access_token',value=tok)
    for hdr in [None,'abc','Bearer abc','Bearer  abc','JWT abc']:
        r=rf.get('/apigw/'); 
        if hdr is not None: r.META['HTTP_AUTHORIZATION']=hdr
        print(f'  access_token={tok!r:6s} header={hdr!r:14s} => {P.AccessTokenPermission().has_permission(r,None)}')
print('\n== MCP _check_auth ==')
import applications.mcp.rpc as M
for tok in ['', 'abc']:
    TM.SysSettings.objects.all().delete()
    if tok: TM.SysSettings.objects.create(key='access_token',value=tok)
    for hdr in [None,'abc','Bearer abc','JWT abc']:
        r=rf.post('/mcp/',data='{}',content_type='application/json')
        if hdr is not None: r.META['HTTP_AUTHORIZATION']=hdr
        res=M.MCPServerView()._check_auth(r)
        print(f'  access_token={tok!r:6s} header={hdr!r:14s} => {"allow" if res is None else "401"}')
