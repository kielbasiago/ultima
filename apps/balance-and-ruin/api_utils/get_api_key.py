
def get_api_key(key):
  from api_utils.seed_storage import SeedStorage
  return SeedStorage.get_api_key(key)
