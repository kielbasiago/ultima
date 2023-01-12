from http.server import BaseHTTPRequestHandler
import os
from urllib.parse import parse_qs, urlparse
from api_utils.get_api_key import get_api_key

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    import json

    qs = parse_qs(urlparse(self.path).query)

    raw_key = qs['api_key'][0]
    seed_id = qs['seed_id'][0]
    
    api_key = get_api_key(raw_key)

    if api_key is None:
      self.send_response(403)
      self.send_header('Content-type', 'application/json')
      self.end_headers()
      self.wfile.write(json.dumps({
        'errors': ['Invalid api key'],
        'success': False
      }).encode())
      
    from api_utils.get_db import get_db
    db = get_db()
    seeds = db.get_collection('seeds')

    seed = seeds.find_one({
      'seed_id': seed_id
    })

    if not seed:
      self.send_response(404)
      self.send_header('Content-type','application/text')
      self.end_headers()
      self.wfile.write(json.dumps({
        'errors': [f"Seed {seed_id} not found"],
        'success': False
      }).encode())
      return

    from api_utils.collections import PATCHES, SEEDS, SPOILER_LOGS
    filter = {'seed_id': seed_id}
    log = db.get_collection(SPOILER_LOGS).find_one(filter)
    patch = db.get_collection(PATCHES).find_one(filter)
    seed = db.get_collection(SEEDS).find_one(filter)

    del seed['_id']
    
    from api_utils.get_seed_payload import get_seed_payload
    from api_utils.get_seed_filename import get_seed_filename
    from api_utils.get_seed_url import get_seed_url
    
    filename = get_seed_filename(seed_id, seed['type'])

    website_url = get_seed_url(seed_id)
    payload = get_seed_payload(seed, log['log'], patch['patch'], website_url=website_url, filename=filename)

    self.send_response(200)
    self.send_header('Content-type','application/json')
    self.end_headers()
    self.wfile.write(json.dumps({
      'data': payload,
      'errors': [],
      'success': True
    }).encode())
