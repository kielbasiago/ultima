from http.server import BaseHTTPRequestHandler
import sys

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    
    from WorldsCollide.api.get_random_sprite_pose import get_random_sprite_pose
    (sprite, palette, pose) = get_random_sprite_pose()
    
    result = { 
      'sprite_id': sprite,
      'palette_id': palette,
      'pose_id': pose
    }

    import json 
    self.send_response(200)
    self.send_header('Content-type','application/json')
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
