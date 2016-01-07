'''
Created on Jan 7, 2016

@author: elioth010
'''
import sys

class Route():
    '''
    classdocs
    '''

    def __init__(self):
        '''
        Constructor
        '''
    def call(self, function_name):
        module = __import__('controller')
        class_ = getattr(module, function_name.split("@")[0])
        method_ = getattr(class_, function_name.split("@")[1])
        if not method_:
            raise Exception("Method %s not implemented" % function_name.split("@")[0])
        
        return method_()
        
    def action(self, function_name, *args):
        module = __import__('controller')
        class_ = getattr(module, function_name.split("@")[0])
        method_ = getattr(class_, function_name.split("@")[1])
        if not method_:
            raise Exception("Method %s not implemented" % function_name.split("@")[0])
        
        if not args:
            try:
                return method_()
            except:
                print("Error en ejecucion:", sys.exc_info()[0])
        else: 
            return method_(args)