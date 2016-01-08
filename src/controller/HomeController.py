'''
Created on Jan 7, 2016

@author: elioth010
'''
from controller.abstract.BaseController import BaseController
from view.abstract import View
from view.abstract import Session

class HomeController(BaseController):
    '''
    classdocs
    '''

    def __init__(self):
        '''
        Constructor
        '''
    def index(self):
        Session.flash("info", "First Flash Session")
        return View.make("home.html")
        