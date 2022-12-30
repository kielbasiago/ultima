def get_seed_payload(seed_id, log, patch, filename):
  import base64
  return {
    'patch': base64.b64encode(patch).decode('utf-8'),
    'log': log,
    'seed_id': seed_id,
    'filename': filename
  }