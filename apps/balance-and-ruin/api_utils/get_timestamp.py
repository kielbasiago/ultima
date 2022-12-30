def get_timestamp():
  from datetime import timezone
  import datetime
  dt = datetime.datetime.now(timezone.utc)
  utc_time = dt.replace(tzinfo=timezone.utc)
  return utc_time.timestamp()
