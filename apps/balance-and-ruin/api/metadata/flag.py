from http.server import BaseHTTPRequestHandler
import sys
from urllib.parse import parse_qs, urlparse

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    sys.path.append("WorldsCollide")
    from WorldsCollide.arguments import Arguments
    arguments = Arguments(False)

    from WorldsCollide.metadata.flag_metadata_writer import FlagMetadataWriter

    result = FlagMetadataWriter(arguments).get_flag_metadata()
    import json
    self.send_response(200)
    self.send_header('Content-type','text/plain')
    self.end_headers()
    self.wfile.write(json.dumps(result).encode())
