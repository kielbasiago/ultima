from http.server import BaseHTTPRequestHandler
import xdelta3
import os
import shutil
import subprocess
import tempfile
import urllib.request

class handler(BaseHTTPRequestHandler):
  def do_POST(self):
    with tempfile.TemporaryDirectory() as temp_dir:
      in_filename = temp_dir + "ff3.smc"
      out_filename = temp_dir + "ff3-out.smc"


      content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
      post_data = self.rfile.read(content_length) # <--- Gets the data itself
      import json
      data = json.loads(post_data)
      flags = data['flags']
      result = self._generate(flags, in_filename, out_filename)

      if result:
        self.send_response(400)
        self.send_header('Content-type', 'text/plain')
        self.end_headers()
        self.wfile.write()
      else:
        with open(in_filename, "rb") as old, open(out_filename, "rb") as new:
            import base64
              
            delta = xdelta3.encode(old.read(), new.read())
            self.send_response(200)
            self.send_header('Content-type','text/plain')
            self.end_headers()

            self.wfile.write(base64.b64encode(delta))

  def _generate(self, flags, in_filename, out_filename):
    src_file = os.getenv("INPUT_ROM") or 'ff3.smc'
    
    if src_file.startswith('http'):
      urllib.request.urlretrieve(src_file, in_filename)
    else:
      shutil.copyfile(src_file, in_filename)
        
    return subprocess.Popen(['python', 'WorldsCollide/wc.py', '-i', in_filename, '-o', out_filename] + flags.split()).wait()

  def do_GET(self):    

    with tempfile.TemporaryDirectory() as temp_dir:
        in_filename = temp_dir + "ff3.smc"
        out_filename = temp_dir + "ff3-out.smc"

        src_file = os.getenv("INPUT_ROM") or 'ff3.smc'
        
        if src_file.startswith('http'):
          urllib.request.urlretrieve(src_file, in_filename)
        else:
          shutil.copyfile(src_file, in_filename)
            
        result = subprocess.Popen(['python', 'WorldsCollide/wc.py', '-i', in_filename, '-o', out_filename, '-s', 'foo']).wait()
        
        # result is the return code from running the sub process
        if result:
          self.send_response(400)
          self.send_header('Content-type', 'text/plain')
          self.end_headers()
          self.wfile.write()
        else:
          with open(in_filename, "rb") as old, open(out_filename, "rb") as new:
              import base64
               
              delta = xdelta3.encode(old.read(), new.read())
              self.send_response(200)
              self.send_header('Content-type','text/plain')
              self.end_headers()

              self.wfile.write(base64.b64encode(delta))
