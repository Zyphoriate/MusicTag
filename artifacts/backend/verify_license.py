#!/usr/bin/env python3
"""Verify a Music Tag Web V2 signed license blob with the public key shipped in the image.

Blob format: urlsafe_b64(payload_json) + "." + urlsafe_b64(RSA-PKCS1v15-SHA256(payload_json))
Usage: python3 verify_license.py <blob> [public_key.pem]
"""
import base64, json, sys
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding

def b64d(s):
    return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    blob = sys.argv[1].strip()
    key_path = sys.argv[2] if len(sys.argv) > 2 else "license_public_key.pem"
    payload_b64, sig_b64 = blob.split(".")
    payload_bytes = b64d(payload_b64)
    sig = b64d(sig_b64)
    payload = json.loads(payload_bytes)
    key = serialization.load_pem_public_key(open(key_path, "rb").read())
    try:
        key.verify(sig, payload_bytes, padding.PKCS1v15(), hashes.SHA256())
        ok = True
    except Exception as e:
        ok = False
        print("signature error:", e)
    print("payload:", json.dumps(payload, ensure_ascii=False, indent=2))
    print("signature:", "VALID" if ok else "INVALID")
    if ok:
        import time
        exp = payload.get("expires_at")
        print("expires_at:", exp, "expired" if exp and exp < time.time() else "not expired")
        print("schema_version:", payload.get("schema_version"))
        print("license_mac:", payload.get("license_mac"))
        print("license_channel:", payload.get("license_channel"))

if __name__ == "__main__":
    main()
