from .dbconfig import db
from flask import Flask

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    img_url = db.Column(db.String)

    #one to many relationship with destination
    destinations = db.relationship('Destination', backref='location',lazy = True)
    def __repr__(self):
        return f"Location name: {self.name}, Description: {self.description}"