def get_seed_payload(seed, log, patch, website_url, filename):
  seed['url'] = website_url
  seed['filename'] = filename

  if log:
    seed['log'] = log
  if patch:
    seed['patch'] = patch
    
  return seed 
