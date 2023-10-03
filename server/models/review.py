from .dbconfig import db

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(255))
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    
    # destination_id = db.Column(db.Integer,db.ForeignKey('destination.id'))
    destinations = db.relationship('ReviewDestination',back_populates='review')