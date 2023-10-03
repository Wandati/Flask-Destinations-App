from .dbconfig import db

class ReviewDestination(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey('review.id'), nullable=False)
    destination_id= db.Column(db.Integer, db.ForeignKey('destination.id'), nullable=False)
    
    review= db.relationship('Review',back_populates='destinations')
    destination= db.relationship('Destination',back_populates='reviews')
    
    def __repr__(self):
        return f"review_id: {self.review_id} for destination_id: {self.destination_id}"