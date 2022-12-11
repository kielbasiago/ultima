from http.server import BaseHTTPRequestHandler
import xdelta3
import os
import shutil
import subprocess
import tempfile
import urllib.request

class handler(BaseHTTPRequestHandler):
  def do_POST(self):
    self.do_GET()
    
  def do_GET(self):    

    with tempfile.TemporaryDirectory() as temp_dir:
        in_filename = temp_dir + "ff3.smc"

        src_file = os.getenv("INPUT_ROM") or 'ff3.smc'

        if src_file.startswith('http'):
          urllib.request.urlretrieve(src_file, in_filename)
        else:
          shutil.copyfile(src_file, in_filename)
            
        out_filename = temp_dir + "ff3-out.smc"
        result = subprocess.Popen(['python', 'WorldsCollide/wc.py', '-i', 'ff3.smc', '-o', out_filename, '-s', 'foo']).wait()
        
        # result is the response code from running the sub process
        if result:
          self.send_response(400)
          self.send_header('Content-type', 'text/plain')
          self.end_headers()
          self.wfile.write()
        else:
          with open("ff3.smc", "rb") as old, open(out_filename, "rb") as new:
              import base64
              import json
              from io import BytesIO
               
              delta = xdelta3.encode(old.read(), new.read())
              self.send_response(200)
              self.send_header('Content-type','')
              self.end_headers()

              # buffer = BytesIO(base64.b64encode(delta)).read()
              # before = delta
              # mid = base64.b64encode(before)
              # after = base64.decodebytes(mid)

              # working
              self.wfile.write(base64.b64encode(delta))
              # wip
              # self.wfile.write(json.dumps(val).encode('utf-8'))
