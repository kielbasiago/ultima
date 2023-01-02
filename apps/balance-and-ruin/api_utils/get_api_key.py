
def get_api_key(key):
  from api_utils.get_db import get_db
  from api_utils.collections import API_KEYS
  return get_db().get_collection(API_KEYS).find_one({ 'key': key })
