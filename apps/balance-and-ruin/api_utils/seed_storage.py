import os
from api_utils.Seed import Seed
from api_utils.get_db import get_db, get_s3
from api_utils.collections import PATCHES, SEEDS, SPOILER_LOGS, API_KEYS
from botocore.exceptions import ClientError

class SeedStorage(object):
    @staticmethod
    def create():
        # create the storage if they don't exist
        pass

    @staticmethod
    def create_seed(seed: Seed, patch, spoiler_log):
        ''' Storage the given seed, patch, and spoiler log in storage
            Return the JSON version of the seed
        '''
        SeedStorage.create()
        # store the seed and its spoiler log
        seeds = get_db().get_collection(SEEDS)
        seed_json = seed.to_json()
        seeds.insert_one(seed_json)

        spoiler_logs = get_db().get_collection(SPOILER_LOGS)
        spoiler_logs.insert_one({
          'seed_id': seed.seed_id,
          'log': spoiler_log
        })

        # store the patch in the S3 bucket
        s3 = get_s3()
        s3.put_object(Bucket=os.environ.get('PATCH_BUCKET'), Key=seed.seed_id, Body=patch)

        return seed_json

    @staticmethod
    def get_api_key(key):
        ''' get the api key from the database -- return None if it doesn't exist '''
        SeedStorage.create()
        return get_db().get_collection(API_KEYS).find_one({'key': key})

    @staticmethod
    def get_spoiler_log(seed_id):
        ''' get the spoiler log from the database -- return None if it doesn't exist '''
        SeedStorage.create()
        log = get_db().get_collection(SPOILER_LOGS).find_one({'seed_id': seed_id})
        del log['_id']
        return log

    @staticmethod
    def get_patch(seed_id):
        ''' get the patch for the given seed id -- return None if it doesn't exist '''
        SeedStorage.create()
        s3 = get_s3()
        db = get_db()
        try:
            s3_obj = s3.get_object(Bucket=os.environ.get('PATCH_BUCKET'), Key=seed_id)
            patch = s3_obj['Body'].read().decode('utf-8')
        except ClientError as e:
            #fallback -- get it from the mongodb instead
            patch = db.get_collection(PATCHES).find_one({'seed_id': seed_id})['patch']
        return patch

    @staticmethod
    def get_seed(seed_id):
        ''' get the seed info for the given seed id -- return None if it doesn't exist '''
        SeedStorage.create()
        db = get_db()
        seeds = db.get_collection('seeds')

        seed = seeds.find_one({
            'seed_id': seed_id
        })
        del seed['_id']
        return seed



