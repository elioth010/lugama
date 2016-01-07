'''
Created on Jan 7, 2016

@author: elioth010
'''
from flask import render_template, redirect, url_for

class View:
    '''
    classdocs
    '''
    def __init__(self):
        '''
        Empty Constructor 
        '''
    @staticmethod
    def make(template_name, **args):
        if not args:
            return render_template(template_name)
        else: 
            return render_template(template_name, args)
    @staticmethod
    def redirect(url):
        return redirect(url_for(url))
    
    