from http.server import BaseHTTPRequestHandler

from api_utils.get_seed_payload import get_seed_payload
import xdelta3
import json
import base64
import os
import shutil
import subprocess
import sys 
import tempfile
import urllib.request
from api_utils.create_seed import create_seed

class handler(BaseHTTPRequestHandler):
  def do_POST(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      from api_utils.get_seed_filename import get_seed_filename
      from api_utils.generate_seed import generate_seed
      seed_id = generate_seed()
      base_filename = get_seed_filename(seed_id, 'johnnydmad')

      dir = temp_dir
      in_filename = dir + "/ff6wc.smc"
      out_filename = dir + f"/{base_filename}.smc"
      log_filename = dir + f"/{base_filename}.txt"

      result = self.generate(in_filename, out_filename, log_filename)
      if result:
        self.send_response(400)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({}))
      else:
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new, open(log_filename, "rb") as logfile:
            # print('---------------------------------------------------------------------------')
            # print(f'   temp_dir: {dir}')
            # print(f'   in_filename: {in_filename}')
            # print(f'   base_filename: {base_filename}')
            # print(f'   out_filename: {out_filename}')
            # print(f'   log_filename: {log_filename}')
            # print('---------------------------------------------------------------------------')

            content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
            post_data = self.rfile.read(content_length) # <--- Gets the data itself
            data = json.loads(post_data)

            from api_utils.get_api_key import get_api_key
            raw_key = data['key']
            api_key = get_api_key(raw_key)
            
            if api_key is None:
              self.send_response(403)
              self.send_header('Content-type', 'text/plain')
              self.end_headers()
              self.wfile.write(json.dumps({
                'errors': ['Invalid api key'],
                'success': False
              }).encode())
              return

            raw_patch = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','application/json')
            self.end_headers()
            
            from api_utils.get_seed_url import get_music_seed_url
            website_url = get_music_seed_url(seed_id)
            log_bytes = logfile.read() 
            log_header = f"Apply this music to your seed at {website_url}\n\n\n"
            log = log_header + log_bytes.decode('utf-8')
            
            description = "Randomized music patch for FF6 Worlds Collide"
            
            patch = base64.b64encode(raw_patch).decode('utf-8')

            s = create_seed(seed_id, description, patch, log, website_url, base_filename, "N/A", "johnnydmad", "1.0.0", None, created_by = api_key['name'])
            del s['_id']
            
            seed = get_seed_payload(s, log, patch, website_url=website_url, filename=base_filename)
            self.wfile.write(json.dumps(seed).encode())

  def do_GET(self):
    self.do_POST()
    
  def generate(self, in_filename, out_filename, music_spoiler_filename):
    src_file = os.getenv("FF6WC_INPUT_ROM") or 'ff6wc.smc'
    if src_file.startswith('http'):
      urllib.request.urlretrieve(src_file, in_filename)
    else:
      shutil.copyfile(src_file, in_filename)

    cwd = os.getcwd()  + "/johnnydmad"
    executable = cwd + "/johnnydmad.py"

    jdm_args = ['-fs','53C5F-9FDFF,340000-3FFFFF', '-nmp', '-noprompt', "-p", "default.txt"]

    args = ['python', executable, '-i', in_filename, '-o', out_filename, '-so', music_spoiler_filename] + jdm_args

    print(f'running command {args}')

    return subprocess.Popen(args, cwd = cwd).wait()
