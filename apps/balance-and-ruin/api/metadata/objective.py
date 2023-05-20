from http.server import BaseHTTPRequestHandler
import sys
from urllib.parse import parse_qs, urlparse

class Object():
  pass

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    from WorldsCollide.metadata.objective_metadata_writer import ObjectiveMetadataWriter

    result = ObjectiveMetadataWriter().get_objective_metadata()
    import json
    self.send_response(200)
    self.send_header("Content-type","application/json")
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
