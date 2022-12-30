from http.server import BaseHTTPRequestHandler
import os
from urllib.parse import parse_qs, urlparse
from api_utils.get_timestamp import get_timestamp

class handler(BaseHTTPRequestHandler):
  def do_GET(self):
    import json
    nonce = 'ff6wc'

    qs = parse_qs(urlparse(self.path).query)

    api_key = qs['api_key'][0]
    seed_id = qs['seed_id'][0]

    if api_key != nonce:
      self.send_response(403)
      self.send_header('Content-type', 'application.json')
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

    from api_utils.collections import PATCHES, SEEDS, SEED_DOWNLOADS, SPOILER_LOGS
    filter = {'seed_id': seed_id}
    get_db().get_collection(SEED_DOWNLOADS).insert_one({ 'created_at': get_timestamp(), 'seed_id': seed_id})
    log = get_db().get_collection(SPOILER_LOGS).find_one(filter)
    patch = get_db().get_collection(PATCHES).find_one(filter)
    seed = get_db().get_collection(SEEDS).find_one(filter)
    website_url = f"{os.getenv('PUBLIC_URL')}/seed/{seed_id}"
    filename = f"ff6wc_{seed_id}"

    val = {
      'flags': seed['flags'],
      'filename': filename,
      'log': log['log'],
      'patch': patch['patch'],
      'seed_id': seed_id,
      'url': website_url
    }
    
    print(val)
            
    self.send_response(200)
    self.send_header('Content-type','application/json')
    self.end_headers()
    self.wfile.write(json.dumps({
      'data': val,
      'errors': [],
      'success': True
    }).encode())
