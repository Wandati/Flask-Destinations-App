from .dbconfig import db

class Destination(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String)
    image_url = db.Column(db.String(255))
    location_id = db.Column(db.Integer, db.ForeignKey('location.id'), nullable=False)
    reviews = db.relationship('ReviewDestination',back_populates='destination')



