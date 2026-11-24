#!/usr/bin/env python3
"""Generate a self-signed Music Tag Web V2 license.

Writes:
  <out-dir>/license_public_key.pem   (overwrites the vendor key shipped in the image)
  <out-dir>/license_blob.txt         (the signed license blob)
  <out-dir>/license_code.txt         (non-empty `code` value required by the runtime)
  <out-dir>/license_private_key.pem  (temporary; delete after signing)

Blob format:
  urlsafe_b64(payload_json) + "." + urlsafe_b64(RSA-PKCS1v15-SHA256(payload_json))
"""
import argparse
import base64
import json
import os
import time

from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding, rsa


def b64u(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out-dir", default="/app/license")
    parser.add_argument("--code", default="SELF-ACTIVATED-V2")
    parser.add_argument("--channel", default="docker")
    parser.add_argument("--subject", default="self-activated")
    parser.add_argument("--days", type=int, default=36500,
                        help="validity in days (default ~100 years)")
    parser.add_argument("--skip-public-key", action="store_true",
                        help="keep the vendor key in place; the runtime adapter "
                             "accepts this blob instead of re-signing it")
    args = parser.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    priv = key.private_bytes(
        serialization.Encoding.PEM,
        serialization.PrivateFormat.PKCS8,
        serialization.NoEncryption(),
    )
    pub = key.public_key().public_bytes(
        serialization.Encoding.PEM,
        serialization.PublicFormat.SubjectPublicKeyInfo,
    )

    payload = {
        "schema_version": "signed_v1",
        "expires_at": int(time.time()) + args.days * 86400,
        "license_mac": "",
        "license_channel": args.channel,
        "role": "V2",
        "subject": args.subject,
    }
    body = json.dumps(payload, separators=(",", ":"), sort_keys=True).encode()
    blob = b64u(body) + "." + b64u(key.sign(body, padding.PKCS1v15(), hashes.SHA256()))

    with open(os.path.join(args.out_dir, "license_private_key.pem"), "wb") as f:
        f.write(priv)
    if not args.skip_public_key:
        with open(os.path.join(args.out_dir, "license_public_key.pem"), "wb") as f:
            f.write(pub)
    with open(os.path.join(args.out_dir, "license_blob.txt"), "w") as f:
        f.write(blob + "\n")
    with open(os.path.join(args.out_dir, "license_code.txt"), "w") as f:
        f.write(args.code + "\n")

    print("license blob written to", os.path.join(args.out_dir, "license_blob.txt"))
    if args.skip_public_key:
        print("vendor public key left untouched")
    else:
        print("public key written to", os.path.join(args.out_dir, "license_public_key.pem"))


if __name__ == "__main__":
    main()
