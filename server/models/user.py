from .dbconfig import db
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import bcrypt
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50))
    email = db.Column(db.String(50))
    _password_hash = db.Column(db.String(50))
    reviews = db.relationship('Review',backref='user')
    
    @validates("email")
    def validate_email(self,key,email):
        if "@" not in email:
            raise ValueError("Missing character @ in email.")
        return email
    
    @hybrid_property
    def password_hash(self):
        raise Exception("Password cannot be Accessed")
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    def __repr__(self):
        return f"Name: {self.username},Email: {self.email}"