from api_utils.get_timestamp import get_timestamp


def create_seed(seed_id, description, patch, log, website_url, filename, flags, seed_type, version, hash, created_by):
  import base64, os
  from api_utils.get_db import get_db, get_s3
  from api_utils.collections import PATCHES, SEEDS, SPOILER_LOGS
  from api_utils.Seed import Seed
  
  seeds = get_db().get_collection(SEEDS)
  s = Seed()
  s.seed_id = seed_id
  s.description = description
  s.flags = flags
  s.hash = hash
  s.type = seed_type
  s.version = version
  s.created_by = created_by
  seed = s.to_json()
  seeds.insert_one(seed)

  patch_obj = {
    'seed_id': seed_id,
    'patch': patch,
    'type': seed_type
  }
  patches = get_db().get_collection(PATCHES)
  patches.insert_one(patch_obj)

  s3 = get_s3()
  s3.put_object(Bucket=os.environ.get('PATCH_BUCKET'), Key=seed_id, Body=patch)

  spoiler_logs = get_db().get_collection(SPOILER_LOGS)
  spoiler_logs.insert_one({
    'seed_id': seed_id,
    'log': log
  })
  
  return seed
