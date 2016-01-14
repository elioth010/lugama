'''
Created on Jan 8, 2016

@author: elioth010
'''
import os
import json
import sys

class Settings(object):
    '''
    classdocs
    '''
    DIR_PATH = os.path.abspath(os.path.realpath(__file__))

    def __init__(self):
        '''
        Constructor
        '''
    def getGlobalConfig(self, key):
        try:
            json_data = open(self.DIR_PATH+'/config.json').read()
            data = json.loads(json_data)    
        except : 
            print("Error en ejecucion:", sys.exc_info()[0])
            raise

        if not key:
            return data
        else: 
            return data[key]