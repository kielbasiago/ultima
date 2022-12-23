from http.server import BaseHTTPRequestHandler
import sys
from urllib.parse import parse_qs, urlparse

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    
    from WorldsCollide.api.get_sprites import get_sprites
    from WorldsCollide.api.get_portraits import get_portraits
    from WorldsCollide.api.get_palettes import get_palettes_with_colors
    
    sprites = get_sprites()
    palettes = get_palettes_with_colors()
    portraits = get_portraits()
    
    result = { 
        'sprites': sprites,
        'palettes': palettes,
        'portraits': portraits
    }

    import json
    self.send_response(200)
    self.send_header('Content-type','text/plain')
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
