from config import app,db,api
from models.location import Location
from models.review import Review
from models.reviewdestination import ReviewDestination
from models.destination import Destination
from models.user import User
from flask_restful import Resource
from flask import jsonify,session,request


class Signup(Resource):
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
    def post(self):
        data= request.get_json()
        username = data["username"]
        password = data["password"]
        user=User.query.filter_by(username=username).first()
        
        if user and user.authenticate(password):
            session["user_id"] = user.id
            return {},200
        return {"error":"Invalid Username or Password"},401

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
            session["user_id"] = None
            return {},204
        return {"error":"Unauthorized action"},401
    
class ReviewById(Resource):
    def get(self, review_id):
        # Retrieve a specific review using its ID
        review = Review.query.get(review_id)
        if review is None:
            return {'error': 'Review not found'}, 404
        return {'id': review.id, 'rating': review.rating, 'comment': review.comment, 'user_id': review.user_id}
            
    
api.add_resource(Login,"/login",endpoint="login")
api.add_resource(Logout,"/logout",endpoint="logout")
api.add_resource(Signup,"/signup",endpoint="signup")
api.add_resource(CheckSession,"/checksession",endpoint="checksession")
api.add_resource(ReviewById, '/reviews/<int:review_id>')



if __name__=="__main__":
    app.run(port=5555,debug=True)