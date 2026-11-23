#!/usr/bin/env python3
"""Decode (and optionally verify) a Music Tag Web access token.
Usage: python3 decode_jwt.py <token> [secret]
The image bakes a default SECRET_KEY into django_vue_cli/settings.so; if the
deployment did not override it, tokens can be verified/forged with that key.
"""
import base64, json, sys
try:
    import jwt
except ImportError:
    jwt = None

def b64d(s):
    return base64.urlsafe_b64decode(s + "=" * (-len(s) % 4))

def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(2)
    tok = sys.argv[1].strip()
    parts = tok.split(".")
    print("header :", json.loads(b64d(parts[0])))
    print("payload:", json.loads(b64d(parts[1])))
    print("sig    :", b64d(parts[2]).hex())
    if len(sys.argv) > 2:
        secret = sys.argv[2]
        if jwt is None:
            print("PyJWT not installed; cannot verify")
        else:
            try:
                print("verify :", jwt.decode(tok, secret, algorithms=["HS256"]))
            except Exception as e:
                print("verify : FAILED", e)

if __name__ == "__main__":
    main()
