import os
from api_utils.Seed import Seed
from api_utils.get_db import get_db, get_s3
from api_utils.collections import SEEDS, SPOILER_LOGS, API_KEYS
from botocore.exceptions import ClientError

class SeedStorage(object):

    USE_PSQL = False
    @staticmethod
    def get_seeds_table(): 
        return os.environ.get('PSQL_SEEDS_TABLE')
    
    @staticmethod
    def get_logs_table(): 
        return os.environ.get('PSQL_LOGS_TABLE')
    
    @staticmethod
    def get_keys_table(): 
        return os.environ.get('PSQL_KEYS_TABLE')
    
    @staticmethod
    def get_patch_bucket():
        return os.environ.get('PATCH_BUCKET')
    
    @staticmethod
    def get_psql_url():
        return os.environ.get("POSTGRES_URL") + "?sslmode=require"

    @staticmethod
    def create():
        if SeedStorage.USE_PSQL:
            # create the storage if they don't exist
            commands = (f"""
                CREATE TABLE IF NOT EXISTS {SeedStorage.get_seeds_table()} (
                    seed_id VARCHAR(32) PRIMARY KEY,
                    description TEXT,
                    flags TEXT,
                    hash VARCHAR(255),
                    type VARCHAR(16),
                    version VARCHAR(16),
                    created_by VARCHAR(255)
                )
                """,
                f"""
                CREATE TABLE IF NOT EXISTS {SeedStorage.get_logs_table()} (
                    seed_id VARCHAR(32) PRIMARY KEY,
                    log TEXT
                )
                """,
                f"""
                CREATE TABLE IF NOT EXISTS {SeedStorage.get_keys_table()} (
                    key VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )
                """)
            
            try:
                conn = psycopg2.connect(SeedStorage.get_psql_url())
                cur = conn.cursor()
                # create table one by one
                for command in commands:
                    cur.execute(command)
                cur.close()
                conn.commit()
            finally:
                if cur is not None:
                    cur.close()
                if conn is not None:
                    conn.close()

    @staticmethod
    def create_seed(seed: Seed, patch, spoiler_log):
        ''' Store the given seed, patch, and spoiler log in storage
            Return the JSON version of the seed
        '''
        SeedStorage.create()
        # store the seed and its spoiler log in mongo TODO: remove
        seeds = get_db().get_collection(SEEDS)
        seed_json = seed.to_json()
        seeds.insert_one(seed_json)

        spoiler_logs = get_db().get_collection(SPOILER_LOGS)
        spoiler_logs.insert_one({
          'seed_id': seed.seed_id,
          'log': spoiler_log
        })

        # store the seed and its spoiler log in postgres
        if SeedStorage.USE_PSQL:
            seed_sql = f""" 
                INSERT INTO {SeedStorage.get_seeds_table()}(seed_id, description, flags, hash, type, version, created_by) 
                VALUES(%s, %s, %s, %s, %s, %s, %s);"""
            log_sql = f""" 
                INSERT INTO {SeedStorage.get_logs_table()}(seed_id, log) 
                VALUES(%s, %s);"""

            try:
                conn = psycopg2.connect(SeedStorage.get_psql_url())
                cur = conn.cursor()
                cur.execute(seed_sql, (seed.seed_id, seed.description, seed.flags, seed.hash, seed.type, seed.version, seed.created_by))
                cur.execute(log_sql, (seed.seed_id, spoiler_log))
                cur.close()
                conn.commit()
            finally:
                if cur is not None:
                    cur.close()
                if conn is not None:
                    conn.close()

        # store the patch in the S3 bucket
        s3 = get_s3()
        s3.put_object(Bucket=SeedStorage.get_patch_bucket(), Key=seed.seed_id, Body=patch)

        return seed_json

    @staticmethod
    def get_api_key(key):
        ''' get the api key from the database -- return None if it doesn't exist '''
        SeedStorage.create()

        api_key = None
        if SeedStorage.USE_PSQL:
            # get from psql
            sql = f""" 
                SELECT key, name FROM {SeedStorage.get_keys_table()} 
                WHERE key = %s;"""

            try:
                conn = psycopg2.connect(SeedStorage.get_psql_url())
                cur = conn.cursor()
                cur.execute(sql, (key, ))
                values = cur.fetchone()
                cur.close()
                conn.commit()

                # put in dictionary format expected by users
                if values is not None:
                    api_key = {}
                    api_key['key'] = values[0]
                    api_key['name'] = values[1]
            except (Exception, psycopg2.Error) as error:
                print(f"Error with {sql} for key {key}", error)
                api_key = None
            finally:
                if cur is not None:
                    cur.close()
                if conn is not None:
                    conn.close()

        if api_key is None:
            # get from mongo db as fallback
            api_key = get_db().get_collection(API_KEYS).find_one({'key': key})
        return api_key

    @staticmethod
    def get_spoiler_log(seed_id):
        ''' get the spoiler log from the database -- return None if it doesn't exist '''
        SeedStorage.create()

        log = None
        if SeedStorage.USE_PSQL:
            # get from psql
            sql = f""" 
                SELECT seed_id, log FROM {SeedStorage.get_logs_table()} 
                WHERE seed_id = %s;"""

            try:
                conn = psycopg2.connect(SeedStorage.get_psql_url())
                cur = conn.cursor()
                cur.execute(sql, (seed_id, ))
                values = cur.fetchone()
                cur.close()
                conn.commit()

                # put in dictionary format expected by users
                if values is not None:
                    log = {}
                    log['seed_id'] = values[0]
                    log['log'] = values[1]
            except (Exception, psycopg2.Error) as error:
                print(f"Error with {sql} for seed_id {seed_id}", error)
                log = None
            finally:
                if cur is not None:
                    cur.close()
                if conn is not None:
                    conn.close()

        # get from mongo db as fallback
        if log is None:
            log = get_db().get_collection(SPOILER_LOGS).find_one({'seed_id': seed_id})
            del log['_id']
        return log

    @staticmethod
    def get_patch(seed_id):
        ''' get the patch for the given seed id -- return None if it doesn't exist '''
        SeedStorage.create()
        s3 = get_s3()
        try:
            s3_obj = s3.get_object(Bucket=SeedStorage.get_patch_bucket(), Key=seed_id)
            patch = s3_obj['Body'].read().decode('utf-8')
        except ClientError as error:
            print(f"Error retrieving patch for seed_id {seed_id}", error)
            patch = None
        return patch

    @staticmethod
    def get_seed(seed_id):
        ''' get the seed info for the given seed id -- return None if it doesn't exist '''
        SeedStorage.create()
 
        seed_json = None
        if SeedStorage.USE_PSQL:
            # get from psql
            sql = f""" 
                SELECT seed_id, description, flags, hash, type, version, created_by FROM {SeedStorage.get_seeds_table()} 
                WHERE seed_id = %s;"""

            try:
                conn = psycopg2.connect(SeedStorage.get_psql_url())
                cur = conn.cursor()
                cur.execute(sql, (seed_id, ))
                seed_values = cur.fetchone()
                cur.close()
                conn.commit()

                if seed_values is not None:
                    temp_seed = Seed()
                    temp_seed.seed_id = seed_values[0]
                    temp_seed.description = seed_values[1]
                    temp_seed.flags = seed_values[2]
                    temp_seed.hash = seed_values[3]
                    temp_seed.type = seed_values[4]
                    temp_seed.version = seed_values[5]
                    temp_seed.created_by = seed_values[6]
                    seed_json = temp_seed.to_json()

            except (Exception, psycopg2.Error) as error:
                print(f"Error with {sql} for seed_id {seed_id}", error)
                seed_json = None
            finally:
                if cur is not None:
                    cur.close()
                if conn is not None:
                    conn.close()

        if seed_json is None:
            # get from mongodb as fallback
            db = get_db()
            seeds = db.get_collection('seeds')

            seed_json = seeds.find_one({
                'seed_id': seed_id
            })
            del seed_json['_id']
        return seed_json



