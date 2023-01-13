from http.server import BaseHTTPRequestHandler
import sys
from urllib.parse import parse_qs, urlparse

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    
    qs = parse_qs(urlparse(self.path).query)

    raw_sprite = qs['spriteId'][0]
    raw_palette = qs['paletteId'][0]
    raw_pose = qs['poseId'][0]

    sprite_id = int(raw_sprite)
    palette_id = int(raw_palette)
    pose_id = int(raw_pose)
    
    from WorldsCollide.api.get_sprite_palette_bytes import get_sprite_palette_bytes

    (sprite_bytes, palette_bytes) = get_sprite_palette_bytes(sprite_id, palette_id, pose_id)

    result = { 
      'sprite': sprite_bytes,
      'palette': palette_bytes 
    }
    import json
    self.send_response(200)
    self.send_header('Content-type','text/plain')
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
