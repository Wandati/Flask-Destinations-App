from .dbconfig import db 
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from flask_sqlalchemy import SQLAlchemy

class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(120), nullable=False)

    # one-to-many relationship with reviews
    reviews = relationship('Review', backref='user', lazy=True)

    # many-to-many relationship with destinations via reviews
    destinations = relationship('Destination', secondary='reviews', back_populates='users')