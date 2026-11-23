#!/bin/bash
# Pull xhongc/music_tag_web:latest layers through the Docker Registry HTTP API
# and extract them into ./rootfs without a Docker daemon.
set -euo pipefail
REPO="${REPO:-xhongc/music_tag_web}"
TAG="${TAG:-latest}"
ARCH="${ARCH:-amd64}"
OUT="${OUT:-rootfs}"
WORK="${WORK:-.mtw-image}"
mkdir -p "$WORK/blobs" "$OUT"
TOKEN=$(curl -s "https://auth.docker.io/token?service=registry.docker.io&scope=repository:${REPO}:pull" | jq -r .token)
curl -sS -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.oci.image.index.v1+json,application/vnd.docker.distribution.manifest.list.v2+json" \
  "https://registry-1.docker.io/v2/${REPO}/manifests/${TAG}" > "$WORK/index.json"
DIGEST=$(jq -r --arg arch "$ARCH" '.manifests[] | select(.platform.architecture==$arch and .platform.os=="linux") | .digest' "$WORK/index.json" | head -1)
curl -sS -H "Authorization: Bearer $TOKEN" -H "Accept: application/vnd.oci.image.manifest.v1+json" \
  "https://registry-1.docker.io/v2/${REPO}/manifests/${DIGEST}" > "$WORK/manifest.json"
curl -sSL -H "Authorization: Bearer $TOKEN" \
  "https://registry-1.docker.io/v2/${REPO}/blobs/$(jq -r .config.digest "$WORK/manifest.json")" > "$WORK/config.json"
jq -r '.layers[].digest' "$WORK/manifest.json" > "$WORK/layers.txt"
while read -r d; do
  f="$WORK/blobs/${d#sha256:}.tar.gz"
  [ -s "$f" ] || curl -sSL --retry 3 -H "Authorization: Bearer $TOKEN" \
    "https://registry-1.docker.io/v2/${REPO}/blobs/$d" -o "$f"
done < "$WORK/layers.txt"
python3 - "$WORK" "$OUT" <<'PY'
import json,os,shutil,sys,tarfile
work,out=sys.argv[1],sys.argv[2]
man=json.load(open(os.path.join(work,'manifest.json')))
def rm(p):
    if os.path.islink(p) or os.path.isfile(p): os.unlink(p)
    elif os.path.isdir(p): shutil.rmtree(p,ignore_errors=True)
for layer in man['layers']:
    f=os.path.join(work,'blobs',layer['digest'].split(':')[1]+'.tar.gz')
    with tarfile.open(f,'r:gz') as tf:
        for m in tf:
            name=m.name.lstrip('./')
            if not name: continue
            parts=name.split('/'); base=parts[-1]; dst=os.path.join(out,name)
            if base=='.wh..wh..opq':
                tgt=os.path.join(out,*parts[:-1])
                if os.path.isdir(tgt):
                    for c in os.listdir(tgt): rm(os.path.join(tgt,c))
                continue
            if base.startswith('.wh.'):
                rm(os.path.join(out,*(parts[:-1]+[base[4:]]))); continue
            if m.isdir(): os.makedirs(dst,exist_ok=True)
            elif m.issym():
                os.makedirs(os.path.dirname(dst),exist_ok=True)
                if os.path.lexists(dst): rm(dst)
                os.symlink(m.linkname,dst)
            elif m.isfile():
                os.makedirs(os.path.dirname(dst),exist_ok=True)
                with tf.extractfile(m) as src, open(dst,'wb') as o: shutil.copyfileobj(src,o)
                os.chmod(dst,m.mode & 0o777)
PY
echo "extracted to $OUT"
