from http.server import BaseHTTPRequestHandler
import subprocess
import sys
import tempfile

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    with tempfile.TemporaryDirectory() as temp_dir:
        in_filename = 'ff3.smc'
        out_filename = temp_dir + "/out-meta.json"
        result = subprocess.Popen(['python', 'WorldsCollide/build-wc-flag-metadata.py', '-i', in_filename, '-o', out_filename]).wait()
        if not result:
          with open(out_filename, "rb") as metadata:
              import json
              self.send_response(200)
              self.send_header('Content-type','application/json') 
              self.end_headers()
              result1 = json.load(metadata)
              self.wfile.write(json.dumps(result1).encode())
        else:
          self.send_response(400)
          self.send_header('Content-type', 'text/plain')
          self.end_headers()
          self.finish()
