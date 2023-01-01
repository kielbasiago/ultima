from http.server import BaseHTTPRequestHandler

from api_utils.get_seed_payload import get_seed_payload
from api_utils.get_seed_url import get_seed_url
from api_utils.create_seed import create_seed

import xdelta3
import json
import os
import shutil
import subprocess
import sys 
import tempfile
import urllib.request

class handler(BaseHTTPRequestHandler):
  def do_POST(self):
    sys.path.append("WorldsCollide")

    with tempfile.TemporaryDirectory() as temp_dir:
      dir = temp_dir
      in_filename = dir + "/ff3.smc"
      from api_utils.generate_seed import generate_seed
      seed_id = generate_seed()
      base_filename = f"ff6wc_{seed_id}"
      out_filename = dir + f"/{base_filename}.smc"
      log_filename = dir + f"/{base_filename}.txt"
      website_url = get_seed_url(seed_id)

      content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
      post_data = self.rfile.read(content_length) # <--- Gets the data itself
      data = json.loads(post_data)
      original_flags = data['flags']
      description = getattr(data, 'description', None)
      flags = original_flags +  f' -url {website_url}'
      result = self._generate(flags, in_filename, out_filename)      

      if result:
        self.send_response(400)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(json.dumps({}))
      else:
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new, open(log_filename, "rb") as logfile:
            patch = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','text/plain')
            self.end_headers()
            
            log_bytes = logfile.read()
            log = log_bytes.decode('utf-8')
            
            seed = create_seed(seed_id, description, patch, log, website_url, base_filename, flags, "ff6wc")
            
            self.wfile.write(json.dumps(seed).encode())

  def _generate(self, flags, in_filename, out_filename):
    src_file = os.getenv("FF3_INPUT_ROM") or 'ff3.smc'
    
    if src_file.startswith('http'):
      urllib.request.urlretrieve(src_file, in_filename)
    else:
      shutil.copyfile(src_file, in_filename)

    cwd = os.getcwd()  + "/WorldsCollide"

    executable = cwd + "/wc.py"

    args = ['python', executable, '-i', in_filename, '-o', out_filename] + flags.split()
    print(f'running command {args}')

    return subprocess.Popen(args, cwd = cwd).wait()

  def do_GET(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      in_filename = temp_dir + "/ff3.smc"
      from WorldsCollide.seed import generate_seed
      seed_id = generate_seed()
      base_filename = f"ff6wc_{seed_id}"
      out_filename = temp_dir + f"/{base_filename}.smc"
      log_filename = temp_dir + f"/{base_filename}.txt"

      # print('---------------------------------------------------------------------------')
      # print(f'   temp_dir: {temp_dir}')
      # print(f'   in_filename: {in_filename}')
      # print(f'   base_filename: {base_filename}')
      # print(f'   out_filename: {out_filename}')
      # print(f'   log_filename: {log_filename}')
      # print('---------------------------------------------------------------------------')

      flags = f"-i {in_filename}"
      result = self._generate(flags, in_filename, out_filename)

      if result:
        self.send_response(400)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write(json.dumps({}))
      else:
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new, open(log_filename, "rb") as log:
            import base64
              
            patch = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','text/plain')
            self.end_headers()
            
            seed = get_seed_payload(seed_id, log.read().decode(), patch, base_filename)
            
            self.wfile.write(json.dumps(seed).encode())
