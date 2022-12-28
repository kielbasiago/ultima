from http.server import BaseHTTPRequestHandler
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
    return self.do_GET()

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

  def do_GET(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      from WorldsCollide.seed import generate_seed
      seed = generate_seed()
      base_filename = f"ff6wc_{seed}-tunes"

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
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new, open(log_filename, "rb") as log:
            import base64
            
            print('---------------------------------------------------------------------------')
            print(f'   temp_dir: {dir}')
            print(f'   in_filename: {in_filename}')
            print(f'   base_filename: {base_filename}')
            print(f'   out_filename: {out_filename}')
            print(f'   log_filename: {log_filename}')
            print('---------------------------------------------------------------------------')

            delta = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','application/json')
            self.end_headers()
            
            val = {
              'patch': base64.b64encode(delta).decode('utf-8'),
              'spoiler_log': log.read().decode(),
              'seed': seed,
              'filename': base_filename
            }
            
            self.wfile.write(json.dumps(val).encode())
