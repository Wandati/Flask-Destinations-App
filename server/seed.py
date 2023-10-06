# Import necessary modules
from app import app
from models.dbconfig import db
from models.review import Review
from models.reviewdestination import ReviewDestination
from models.destination import Destination
from models.user import User
from faker import Faker
from random import randint, choice as rc

# Create a function to seed reviews

def seed_reviews(num_reviews):
    Review.query.delete()
    ReviewDestination.query.delete()
    db.session.commit()

    fake = Faker()
    users = User.query.all()  # Get all existing users
    destinations = Destination.query.all()  # Get all existing destinations
    reviews = []

    for _ in range(num_reviews):
        random_user = rc(users)
        random_destination = rc(destinations)
        review = Review(
            comment=fake.sentence(),
            rating=randint(1, 10),
            user_id=random_user.id,
        )
        review_destination = ReviewDestination(
            review=review,
            destination=random_destination
        )
        reviews.append(review)

    db.session.add_all(reviews)
    db.session.commit()

# Use the function to seed reviews
with app.app_context():
    seed_reviews(10)  # Change the number as needed

print("Seed Data Has been Added Successfully!!!")
