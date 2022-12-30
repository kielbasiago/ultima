
import os
from api_utils.collections import API_KEYS, PATCHES, PRESETS, SEED_DOWNLOADS, SEEDS, SPOILER_LOGS
from pymongo import MongoClient

# Load the mongodb database client
# This also run a migration to create all tables if they do not already exist 
def get_db():
  def migration(database):
    collection_names = database.list_collection_names()
      
    if API_KEYS not in collection_names:
      api_keys = database.create_collection(API_KEYS)
    
    if PATCHES not in collection_names:
      patches = database.create_collection(PATCHES) 
      
    if PRESETS not in collection_names:
      presets = database.create_collection(PRESETS)

    if SEEDS not in collection_names:
      seeds = database.create_collection(SEEDS)
      
    if SEED_DOWNLOADS not in collection_names:
      seed_downloads = database.create_collection(SEED_DOWNLOADS)

    if SPOILER_LOGS not in collection_names:
      spoiler_logs = database.create_collection(SPOILER_LOGS)

  db_client = MongoClient(os.getenv('MONGODB_URI'))
  db = db_client['ff6wc']
  migration(db)
  return db
