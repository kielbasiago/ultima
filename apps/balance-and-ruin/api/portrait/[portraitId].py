from http.server import BaseHTTPRequestHandler
import sys
from urllib.parse import parse_qs, urlparse


class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    
    qs = parse_qs(urlparse(self.path).query)

    raw_portrait = qs['portraitId'][0]

    portrait_id = int(raw_portrait)
    
    from WorldsCollide.api.get_portrait_bytes import get_portrait_bytes

    (sprite_bytes, palette_bytes) = get_portrait_bytes(portrait_id)

    result = { 
      'sprite': sprite_bytes,
      'palette': palette_bytes 
    }
    import json
    self.send_response(200)
    self.send_header('Content-type','text/plain')
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
