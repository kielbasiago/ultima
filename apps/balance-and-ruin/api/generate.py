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
    sys.path.append("WorldsCollide")

    with tempfile.TemporaryDirectory() as temp_dir:
      in_filename = temp_dir + "ff3.smc"
      from WorldsCollide.seed import generate_seed
      seed = generate_seed()
      base_filename = f"ff6wc_{seed}";
      out_filename = temp_dir + f"{base_filename}.smc"
      log_filename = temp_dir + f"{base_filename}.txt"


      content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
      post_data = self.rfile.read(content_length) # <--- Gets the data itself
      data = json.loads(post_data)
      flags = data['flags']
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

  def _generate(self, flags, in_filename, out_filename):
    src_file = os.getenv("INPUT_ROM") or 'ff3.smc'
    print("GENERATING WITH FLAGS", flags)
    
    if src_file.startswith('http'):
      urllib.request.urlretrieve(src_file, in_filename)
    else:
      shutil.copyfile(src_file, in_filename)
      
    cwd = os.getcwd()  + "/WorldsCollide"
    
    executable = cwd + "/wc.py"

    print('cwd', cwd)
    return subprocess.Popen(['python', executable, '-i', in_filename, '-o', out_filename] + flags.split(), cwd = cwd).wait()

  def do_GET(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      in_filename = temp_dir + "ff3.smc"
      from WorldsCollide.seed import generate_seed
      seed = generate_seed()
      base_filename = f"ff6wc_{seed}";
      out_filename = temp_dir + f"{base_filename}.smc"
      log_filename = temp_dir + f"{base_filename}.txt"


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
