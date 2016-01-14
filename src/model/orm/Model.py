'''
Created on Jan 8, 2016

@author: elioth010
'''
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.session import sessionmaker
from sqlalchemy.sql.expression import text

from model.orm.DB import DB


class Model(DB):
    '''
    classdocs
    '''
    
    base = None
    SessionFactory = None
    session = None
    
    def __init__(self):
        '''
        Constructor
        '''
        self.base = declarative_base()
        self.SessionFactory = sessionmaker(bind=self.engine)
        self.session = self.SessionFactory()
        
    def save(self):
        self.session = self.SessionFactory()
        try:
            self.session.add(self)
            self.session.commit()
        except:
            self.session.rollback()
            raise
    
    def where(self, *args):
        self.session = self.SessionFactory()
        try:
            return self.session.query(self).filter_by(args).all()
        except:
            self.session.rollback()
            raise
    
    def find(self, id_table):
        self.session = self.SessionFactory()
        try:
            return self.session.query(self).filter(text('id='+id_table)).all()
        except:
            self.session.rollback()
            raise
    
    def delete(self):
        self.session = self.SessionFactory()
        try:
            self.session.delete(self)
            self.session.commit()
        except:
            self.session.rollback()
            raise
