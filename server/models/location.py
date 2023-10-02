from .dbconfig import db
from flask import Flask

class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    image_url = db.Column(db.String(200))

    destinations = db.relationship('Destination', back_populates='location')
