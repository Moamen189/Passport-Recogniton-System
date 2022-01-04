from db import db

class PassportModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    Country = db.Column(db.String(100), nullable=False)
    Name = db.Column(db.String(100), nullable=False)
    Surname = db.Column(db.String(100), nullable=False)
    Sex = db.Column(db.String(100), nullable=False)
    DateOfBirth = db.Column(db.Integer, nullable=False)
    Nationality = db.Column(db.String(100), nullable=False)
    ExpirationDate = db.Column(db.Integer, nullable=False)
    Number = db.Column(db.String(30), nullable=False)
    Status = db.Column(db.Boolean)
    Problem = db.Column(db.SmallInteger)
