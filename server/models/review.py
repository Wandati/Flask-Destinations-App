from .dbconfig import db
from sqlalchemy.orm import validates
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    comment = db.Column(db.String(255))
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    
    # destination_id = db.Column(db.Integer,db.ForeignKey('destination.id'))
    destinations = db.relationship('ReviewDestination',back_populates='review',cascade='all, delete')
    
    @validates("rating")
    def validates_rating(self,key,rating):
        rating = int(rating)
        if not (1<= rating <=5):
            raise ValueError("Rating should be between 1 and 5.")
        return rating
    def __repr__(self):
        return f"Review comment: {self.comment} ,rating: {self.rating} by User: {self.user_id}"