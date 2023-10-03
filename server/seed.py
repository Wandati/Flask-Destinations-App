from app import app
from models.dbconfig import db
from models.location import Location
from models.review import Review
from models.reviewdestination import ReviewDestination
from models.destination import Destination
from models.user import User

from faker import Faker
from random import randint,choice as rc
with app.app_context():
    User.query.delete()
    Location.query.delete()
    Destination.query.delete()
    ReviewDestination.query.delete()
    db.session.commit()
    fake= Faker()
    users = []
    for _ in range(5):
        user = User(username=fake.name(),password=fake.sentence(),email=fake.name())
        users.append(user)
    db.session.add_all(users)
    db.session.commit()
    locations = []
    for _ in range(5):
        location = Location(name=fake.address(),img_url=fake.sentence(),description=fake.sentence())
        locations.append(location)
    db.session.add_all(locations)
    db.session.commit()
    destinations = []
    # random_location= rc(locations)
    for _ in range(5):
        random_location = rc(locations)
        destination = Destination(name=fake.address(),image_url=fake.sentence(),description=fake.sentence(),location_id=random_location.id)
        destinations.append(destination)
    db.session.add_all(destinations)
    db.session.commit()
    reviews = []
    # random_user= rc(users)
    for _ in range(10):
        random_user= rc(users)
        review = Review(comment=fake.sentence(),rating=randint(1,10),user_id=random_user.id)
        reviews.append(review)
    db.session.add_all(reviews)
    db.session.commit()
    # random_destination=rc(destinations)
    # random_review=rc(reviews)
    for _ in range(10):
        random_destination=rc(destinations)
        random_review=rc(reviews)
        review_destination=ReviewDestination(destination_id=random_destination.id,review_id=random_review.id)
        db.session.add(review_destination)
        db.session.commit()
        
        
print("Seed Data Has been Added Successfully!!!")
    
    