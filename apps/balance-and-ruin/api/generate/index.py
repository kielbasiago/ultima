import sys 
import tempfile
from api_utils.generate_handler import GenerateHandler

class handler(GenerateHandler):
  def include_patch(self):
    return True
  
  def include_log(self): 
    return True

  def use_protocol(self):
    return "recaptcha"
