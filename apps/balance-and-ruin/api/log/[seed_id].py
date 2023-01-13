from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from api_utils.get_db import get_db
from api_utils.collections import API_KEYS, SPOILER_LOGS

class handler(BaseHTTPRequestHandler):
  def do_GET(self):    
    import json
    
    qs = parse_qs(urlparse(self.path).query)
    seed_id = qs['seed_id'][0]

    content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
    post_data = self.rfile.read(content_length) # <--- Gets the data itself
    data = json.loads(post_data)
    key = data['key']
    api_key = get_db().get_collection(API_KEYS).find_one({'key': key})
    log = get_db().get_collection(SPOILER_LOGS).find_one({'seed_id': seed_id})
    del log['_id']
    
    if api_key is None:
      self.send_response(403)
      self.send_header('Content-type','text/plain')
      self.end_headers()
      self.wfile.write(f"Api key is invalid".encode())
    elif log is None:
      self.send_response(404)
      self.send_header('Content-type','text/plain')
      self.end_headers()
      self.wfile.write(f"Log for seed_id {seed_id} not found".encode())
    else:
      self.send_response(200)
      self.send_header('Content-type','application/json')
      self.end_headers()
      self.wfile.write(json.dumps(log).encode())
