'''
Created on Jan 7, 2016

@author: elioth010
'''
from flask import flash

class Session:
    '''
    classdocs
    '''
    
    def __init__(self):
        '''
        Empty Constructor
        '''
    @staticmethod
    def flash(category, message):
        flash(message, category)    