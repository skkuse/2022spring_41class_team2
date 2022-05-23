import pymysql
import threading
from threading import RLock


class Database():
    def __init__(self):
        self. LOCK = RLock()
        self.db = pymysql.connect(host='crawllearn.c9gmjfuhyzdf.us-east-1.rds.amazonaws.com',
                                  user='admin',
                                  password='thrhdroghkdlxld',
                                  db='crawllearn_dev',
                                  
                                  charset='utf8')
        
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def execute(self, query, args={}):
        with self.LOCK:
            self.cursor.execute(query, args)

    def executeOne(self, query, args={}):
        with self.LOCK:
            self.cursor.execute(query, args)
            row = self.cursor.fetchone()
        return row

    def executeAll(self, query, args={}):
        with self.LOCK:
            self.cursor.execute(query, args)
            row = self.cursor.fetchall()
        return row

    def commit(self):
        with self.LOCK:
            self.db.commit()
