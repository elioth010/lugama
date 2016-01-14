'''
Created on Jan 8, 2016

@author: elioth010
'''
from sqlalchemy import create_engine
from Settings import Settings
from sqlalchemy.sql.expression import text
from sqlalchemy.orm.session import sessionmaker

class DB(object):
    '''
    classdocs
    '''
    settings = None
    databaseConfig = None
    engine = None
    SessionFactory = None
    session = None

    def __init__(self, params):
        '''
        Constructor
        '''
        self.settings = Settings()
        self.databaseConfig = self.settings.getGlobalConfig("database");
        '''
        'mysql+mysqldb://scott:tiger@localhost/foo'
        '''
        dbEngine = self.databaseConfig[0]["default"]
        configEngine = self.databaseConfig[1][dbEngine]
        if not "oracle" in dbEngine: 
            self.engine = create_engine(configEngine["engine"] + "://" + configEngine["user"] + ":" + configEngine["password"] + "@" + configEngine["host"] + ":" + configEngine["port"] + "/" + configEngine["database"])
        else:
            self.engine = create_engine(configEngine["engine"] + "://" + configEngine["user"] + ":" + configEngine["password"] + "@" + configEngine["host"] + ":" + configEngine["port"] + "/" + configEngine["sid"])
            
        self.SessionFactory = sessionmaker(bind=self.engine)
    
    @staticmethod
    def executeSQL(self, model, sql, *parameters):
        self.session = self.SessionFactory()
        try:
            return self.session.query(model).from_statement(text("SELECT * FROM users where name=:name")).params(parameters).all()
        except:
            self.session.rollback()
            raise
