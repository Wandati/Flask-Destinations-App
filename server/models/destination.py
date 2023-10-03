from .dbconfig import db

class Destination(db.Model):
     
    id = db.Column(db.Integer, primary_key=True )
    name = db.Column(db.String(255))
    description = db.Column(db.Text)
    image_url = db.Column(db.String)
    location_id = db.Column(db.Integer, ForeignKey=('location.id'), nullable =False)
    location=db.relation('Location', back_populates='destinations')
    reviews = db.relationship('Review', back_populates='destination', lazy=True)




