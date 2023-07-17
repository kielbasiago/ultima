from api_utils.get_timestamp import get_timestamp


def create_seed(seed_id, description, patch, log, website_url, filename, flags, seed_type, version, hash, created_by):
  from api_utils.Seed import Seed
  from api_utils.seed_storage import SeedStorage
  
  s = Seed()
  s.seed_id = seed_id
  s.description = description
  s.flags = flags
  s.hash = hash
  s.type = seed_type
  s.version = version
  s.created_by = created_by
  return SeedStorage.create_seed(s, patch, log)
