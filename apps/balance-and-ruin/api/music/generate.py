from http.server import BaseHTTPRequestHandler

from api_utils.get_seed_payload import get_seed_payload
from api_utils.get_db import get_db
import xdelta3
import json
import os
import shutil
import subprocess
import sys 
import tempfile
import urllib.request
from api_utils.create_seed import create_seed
from api_utils.get_seed_url import get_music_seed_url

class handler(BaseHTTPRequestHandler):
  def do_POST(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      from WorldsCollide.seed import generate_seed
      seed_id = generate_seed()
      base_filename = f"ff6wc_{seed_id}-tunes"

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

            patch = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','application/json')
            self.end_headers()
            
            log_bytes = logfile.read()
            log_header = f"Apply this music to your seed at {get_music_seed_url(seed_id)}\n\n\n"
            log = log_header + log_bytes.decode('utf-8')
            
            website_url = get_music_seed_url(seed_id)
            description = "Randomized music patch for FF6 Worlds Collide"
            
            create_seed(seed_id, description, patch, log, website_url, base_filename)
            
            seed = get_seed_payload(seed_id, log, patch, base_filename)            

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
