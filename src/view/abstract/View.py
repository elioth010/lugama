'''
Created on Jan 7, 2016

@author: elioth010
'''
from flask import render_template, redirect, url_for
from builtins import staticmethod

class View:
    '''
    classdocs
    '''
    def __init__(self):
        '''
        Empty Constructor 
        '''
        
    @staticmethod
    def make(self, template_name, **args):
        self.template_name = template_name;
        if not args:
            return render_template(template_name)
        else: 
            return render_template(template_name, args)
    
    @staticmethod
    def redirect(self, url):
        return redirect(url_for(url))
    
    