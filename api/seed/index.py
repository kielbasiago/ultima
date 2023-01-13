from api_utils.generate_handler import GenerateHandler

class handler(GenerateHandler):
  def use_protocol(self):
    return "api_key"

  def include_patch(self):
    return False
  
  def include_log(self):
    return False
