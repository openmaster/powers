## Steps to generate config.json

   1. Create a Google service account.
   2. Download private Key file.
   3. Rename it to config.json.
   4. place it in etc/ directory.

#### your `private key / config.json` file will looks as following sample file.
```
{
  "type": "service_account",
  "project_id": "sample-215",
  "private_key_id": "b04e67953e3b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvDANBgkqhkw0BQb3UazIjjn0L/m2zQHawJKryMnOfZqTSjrMb/I4Ke21r\nU8Idi3a0A==\n-----END PRIVATE KEY-----\n",
  "client_email": "sample-22@sample1-215.iam.gserviceaccount.com",
  "client_id": "114050",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sample-22%40sample1-215.iam.gserviceaccount.com"
}
```

