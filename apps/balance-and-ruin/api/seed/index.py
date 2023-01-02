from api_utils.generate_handler import GenerateHandler

class handler(GenerateHandler):
  def include_patch(self):
    return False
  
  def include_log(self):
    return False

  def do_POST(self):
    super().do_POST()
