from config import app,db,api,limiter
from models.location import Location
from models.review import Review
from models.reviewdestination import ReviewDestination
from models.destination import Destination
from models.user import User
from flask_restful import Resource
from flask import session,request
import os

class Signup(Resource):
    decorators = [limiter.limit("5 per minute")]

    def post(self):
        data = request.get_json()
        username = data["username"]
        email= data["email"]
        password = data["password"]
        existing_user=User.query.filter_by(username=username).first()
        if existing_user:
            return {"error":"Username Already Exists"},401
        new_user = User(username=username,email=email)
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session["user_id"] = new_user.id
        return {},201
class Login(Resource):
    decorators = [limiter.limit("10 per minute")]

    def post(self):
        data= request.get_json()
        username = data["username"]
        password = data["password"]
        user=User.query.filter_by(username=username).first()
        
        if not user:
            return {"error":"Invalid Username"},401
        elif not user.authenticate(password):
            return {"error":"Invalid Password"},401
        
        session["user_id"] = user.id
        new_user = {
                "username":username,
                "user_id":user.id
            }
        return new_user,200

class CheckSession(Resource):
    def get(self):
       user = User.query.filter(User.id == session.get('user_id')).first()
       if user:
           return {},200
       else:
           return {'message': '401: Not Authorized'}, 401
       
class Logout(Resource):
    def delete(self):
        if "user_id" in session:
            session.pop("user_id", None)
            return {},204
        return {"error":"Unauthorized action"},401
    
class CheckUser (Resource):
    def get(self, id):
        user_id = session.get("user_id")
        if not user_id or user_id != id:
            return {"error": "Unauthorized"}, 401
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"error": "User not found"}, 404
        new_user = {
            "id":user.id,
            "username":user.username
        }

        return new_user, 200
    
class DisplayLocations(Resource):
    def get(self):
        locations = [{
            "id":location.id,
            "name": location.name,
            "description": location.description,
            "image_url": location.img_url,
        }
        for location in Location.query.all()
        ]
        return locations,200
    def post(self):
        try:
            data = request.json  
            new_location = Location(
                name=data['name'],
                description=data['description'],
                img_url=data['image_url']
            )
            db.session.add(new_location)
            db.session.commit()
            return {'message': 'Location successfully added'}, 201
        except Exception as e:
            return {'error': str(e)}, 400
class DisplayLocationsById(Resource):
    def get(self,id):
        location = Location.query.filter_by(id=id).first()
        if not location:
            return {"Message": "Destination not Found"},401
        location_data = {
            'id': location.id,
            'name': location.name,
            'description': location.description,
            'image_url': location.img_url,
            'destinations':[{
                "id":destination.id,
                "description": destination.description,
                "image_url": destination.image_url
            }
                for destination in location.destinations
            ] 
        }
        return location_data,200
class DisplayDestinations(Resource):
    def get(self):
        destinations = [{
            "id":destination.id,
            "name": destination.name,
            "description": destination.description,
            "image_url": destination.image_url,
            "location_id": destination.location_id
        }
        for destination in Destination.query.all()
        ]
        return destinations,200
class DisplayDestinationsById(Resource):
    def get(self,id):
        destination = Destination.query.filter_by(id=id).first()
        if not destination:
            return {"Message": "Destination not Found"},401
        destination_data = {
            'id': destination.id,
            'name': destination.name,
            'description': destination.description,
            'image_url': destination.image_url,
            'location_id': destination.location_id,
            "reviews": [{
                "id": review.review.id,
                "username":review.review.user.username,
                "rating": review.review.rating,
                "comment": review.review.comment
            } for review in destination.reviews
            ]
        }
        return destination_data,200
class ReviewResource(Resource):
    def get(self):
        reviews = [{
            "id":review.id,
            "rating":review.rating,
            "comment":review.comment,
            "user_id":review.user_id,
            "username":review.user.username
        }
         for review in Review.query.all()
        ]
        
        return reviews,200
   
class DestinationReviews(Resource):
    def post(self, id):
        data = request.get_json()

        user_id = session.get("user_id")
        if not user_id:
            return {"error": "Log in to add a review"}, 401
        destination = Destination.query.filter_by(id=id).first()
        if not destination:
            return {"error": "Destination not found"}, 404
        existing_review = db.session.query(ReviewDestination).\
            join(Review).filter(Review.user_id == user_id, ReviewDestination.destination_id == id).first()
        if existing_review:
            return {"error": "Multiple Reviews for the same Destination are not allowed!"}, 403

        try:
            new_review = Review(
                rating=data['rating'],
                comment=data['comment'],
                user_id=user_id
            )

            db.session.add(new_review)
            db.session.commit()

            new_review_destination = ReviewDestination(review_id=new_review.id, destination_id=destination.id)
            db.session.add(new_review_destination)
            db.session.commit()

            return {"status": "Review Created Successfully.."}, 201
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 400
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 400

        
        
class ReviewById(Resource):
    def get(self, id):
        user_id = session.get("user_id")
        if not user_id or user_id != id:
            return {"error":"Unauthorized"},401
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return {"error":"Unauthorized"},401

        if not user.reviews:
            return {'error': 'No Reviews currently'}, 404
        reviews = [
            {
                'id': review.id,
                "username":review.user.username,
                'rating': review.rating,
                'comment': review.comment,
            }
            for review in user.reviews
        ]
        return reviews,200

    def delete(self, id):
        user_id = session.get("user_id")
        if not user_id:
            return {"error":"Unauthorized"},401
        review = Review.query.filter_by(id=id).first()
        if not review:
            return {"error":"Review not Found"},404
        if review.user_id != user_id:
            return {"error":"Unauthorized"},403
        db.session.delete(review)
        db.session.commit()
        return {'message': 'Review deleted successfully'}

    def patch(self, id):
        user_id = session.get("user_id")
        if not user_id:
            return {"error":"Unauthorized"},401
        review = Review.query.filter_by(id=id).first()
        if not review:
            return {"error":"Review not Found"},404
        if review.user_id != user_id:
            return {"error":"Unauthorized"},403
        data = request.get_json()
        try:
            for attr in ("rating", "comment"):
                if attr in data:
                    setattr(review, attr, data[attr])
        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 400
        db.session.commit()
        return {
            'id': review.id,
            'rating': review.rating,
            'comment': review.comment,
            'user_id': review.user_id
        }, 200


class CreateReviewDestinations(Resource):
    def post(self):
        data = request.get_json()
        if not ("review_id" in data and "destination_id" in data):
            return {"error": "review_id and destination_id are required fields"}, 401
        
        review_id = data["review_id"]
        destination_id = data["destination_id"]
        
        # Check if the review already exists for the given destination
        existing_review_destination = ReviewDestination.query.filter_by(review_id=review_id, destination_id=destination_id).first()
        if existing_review_destination:
            return {"error": "Review already exists for this destination"}, 401

        review = db.session.get(Review, review_id)
        destination = db.session.get(Destination, destination_id)

        if not review or not destination:
            return {"error": "Review or Destination does not exist"}, 404

        try:
            new_review_destination = ReviewDestination(review=review, destination=destination)
            db.session.add(new_review_destination)
            db.session.commit()

            destination_data = {
                "id": destination.id,
                "name": destination.name,
                "description": destination.description,
                "image_url": destination.image_url,
                "Reviews": [{
                    "id": review.review.id,
                    "rating": review.review.rating,
                    "comment": review.review.comment
                } for review in destination.reviews
                ]
            }
            return destination_data, 200
        except Exception as e:
            return {"error":str(e)},403

# All API routes live under /api so they can't collide with the React
# Router page paths (/destinations, /locations, ...) when the frontend
# is served with rewrites in production.
api.add_resource(Login,"/api/login",endpoint="login")
api.add_resource(Logout,"/api/logout",endpoint="logout")
api.add_resource(Signup,"/api/signup",endpoint="signup")
api.add_resource(CheckUser,"/api/checkuser/<int:id>")
api.add_resource(CheckSession,"/api/checksession",endpoint="checksession")
api.add_resource(ReviewResource, '/api/reviews')
api.add_resource(ReviewById, '/api/reviews/<int:id>')
api.add_resource(DisplayDestinations, '/api/destinations',endpoint="destinations")
api.add_resource(DisplayDestinationsById, '/api/destinations/<int:id>')
api.add_resource(DisplayLocations,'/api/locations',endpoint='/locations')
api.add_resource(DisplayLocationsById,'/api/locations/<int:id>')
api.add_resource(CreateReviewDestinations,"/api/reviewdestinations",endpoint="reviewdestinations")
api.add_resource(DestinationReviews,"/api/destinationreviews/<int:id>")

if __name__=="__main__":
    # Debug mode (interactive debugger + auto-reload) must be opted into;
    # never enable it on a server reachable by others.
    app.run(port=5555, debug=os.environ.get("FLASK_DEBUG", "0") == "1")
