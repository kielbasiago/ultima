from api_utils.get_timestamp import get_timestamp


def create_seed(seed_id, description, raw_patch: bytes, log, website_url, filename, flags, seed_type):
  import base64
  from api_utils.get_db import get_db
  from api_utils.collections import PATCHES, SEEDS, SEED_DOWNLOADS, SPOILER_LOGS
  
  patch = base64.b64encode(raw_patch).decode('utf-8')
  seeds = get_db().get_collection(SEEDS)
  seeds.insert_one({
    'seed_id': seed_id,
    'created_at': get_timestamp(),
    'description': description,
    'flags': flags,
    'type': seed_type
  })
  
  patches = get_db().get_collection(PATCHES)
  patches.insert_one({
    'seed_id': seed_id,
    'patch': patch,
    'type': seed_type
  })

  spoiler_logs = get_db().get_collection(SPOILER_LOGS)
  spoiler_logs.insert_one({
    'seed_id': seed_id,
    'log': log
  })
  
  seed_downloads = get_db().get_collection(SEED_DOWNLOADS)
  seed_downloads.insert_one({
    'seed_id': seed_id,
    'created_at': get_timestamp()
  })
  
  return  {
    'flags': flags,
    'filename': filename,
    'log': log,
    'patch': patch,
    'seed_id': seed_id,
    'url': website_url
  }
