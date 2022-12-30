from http.server import BaseHTTPRequestHandler
from api_utils.get_timestamp import get_timestamp
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
      website_url = f"https://{os.getenv('VERCEL_URL')}/seed/{seed_id}"

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
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new, open(log_filename, "rb") as log:
            import base64
              
            delta = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','text/plain')
            self.end_headers()
            
            patch = base64.b64encode(delta).decode('utf-8')
            spoiler_log = log.read().decode()
            
            from api_utils.get_db import get_db
            from api_utils.collections import PATCHES, SEEDS, SEED_DOWNLOADS, SPOILER_LOGS
            
            seeds = get_db().get_collection(SEEDS)
            seeds.insert_one({
              'seed_id': seed_id,
              'created_at': get_timestamp(),
              'description': description,
              'flags': original_flags
            })
            
            patches = get_db().get_collection(PATCHES)
            patches.insert_one({
              'seed_id': seed_id,
              'patch': patch
            })

            spoiler_logs = get_db().get_collection(SPOILER_LOGS)
            spoiler_logs.insert_one({
              'seed_id': seed_id,
              'log': spoiler_log
            })
            
            seed_downloads = get_db().get_collection(SEED_DOWNLOADS)
            seed_downloads.insert_one({
              'seed_id': seed_id,
              'created_at': get_timestamp()
            })
            
            val = {
              'flags': flags,
              'filename': base_filename,
              'log': spoiler_log,
              'patch': patch,
              'seed_id': seed_id,
              'url': website_url
            }
            
            self.wfile.write(json.dumps(val).encode())

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
      seed = generate_seed()
      base_filename = f"ff6wc_{seed}"
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
              
            delta = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','text/plain')
            self.end_headers()
            
            val = {
              'patch': base64.b64encode(delta).decode('utf-8'),
              'spoiler_log': log.read().decode(),
              'seed': seed,
              'filename': base_filename
            }
            
            self.wfile.write(json.dumps(val).encode())
