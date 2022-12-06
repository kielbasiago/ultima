from http.server import BaseHTTPRequestHandler
import subprocess
import tempfile
import ips

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    print('inside handler')
    import sys
    sys.path.append("WorldsCollide")
    from WorldsCollide.wc import main
    with tempfile.TemporaryDirectory() as temp_dir:
        out_filename = temp_dir + "ff3-out.smc"
        result = subprocess.Popen(['python', 'WorldsCollide/wc.py', '-i', 'ff3.smc', '-o', out_filename]).wait()
        if result:
          self.send_response(400)
          self.send_header('Content-type', 'text/plain')
          self.end_headers()
          self.wfile.write()
        else:
          with open("ff3.smc", "rb") as old, open(out_filename, "rb") as new:
              import base64
              import json
              
              p = ips.Patch.create(old, new)
              self.send_response(200)
              self.send_header('Content-type','text/plain')
              self.end_headers()
              self.wfile.write(base64.b64encode(bytes(p)))

