

def get_seed_url(seed_id):
  import os
  return f"{os.getenv('PUBLIC_URL')}/seed/{seed_id}"

def get_music_seed_url(seed_id):
  import os
  return f"{os.getenv('PUBLIC_URL')}/music/seed/{seed_id}"
  