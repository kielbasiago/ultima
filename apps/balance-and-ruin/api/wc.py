from http.server import BaseHTTPRequestHandler
import sys 

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    sys.path.append("WorldsCollide") 
    from WorldsCollide.api.get_manifest import get_manifest
    manifest = get_manifest()
    import json
    self.send_response(200)
    self.send_header('Content-type','application.json')
    self.end_headers()
    self.wfile.write(json.dumps(manifest).encode())
