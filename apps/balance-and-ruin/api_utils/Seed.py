from api_utils.get_timestamp import get_timestamp
class Seed(object):
  def __init__(self):
    self.seed_id = None
    self.description = None
    self.flags = None
    self.hash = None
    self.type = None
    self.version = None
    self.created_by = None
    self.created_at = get_timestamp()
    
  def to_json(self ):
    return {
      'seed_id': self.seed_id,
      'description': self.description,
      'flags': self.flags,
      'hash': self.hash,
      'type': self.type,
      'version': self.version,
      'created_by': self.created_by,
      'created_at': self.created_at,
      'filename': None,
      'log': None,
      'patch': None,
      'url': None,
    }

  def assign(self, data):
    self.seed_id = data['seed_id']
    self.description = data['description']
    self.flags = data['flags']
    self.hash = data['hash']
    self.type = data['type']
    self.version = data['version']
    self.created_by = data['created_by']
    self.created_at = data['created_at']
