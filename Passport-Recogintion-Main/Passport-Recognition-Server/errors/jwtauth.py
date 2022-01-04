import jwt
import datetime
from flask import request
from models.users import User
from config import Secretkey


def isAuthorized():
    token = None

    if 'Access-Token' in request.headers:
        token = request.headers['Access-Token']

    if not token:
        return 'missing'
    try:
        data = jwt.decode(token, Secretkey, algorithms="HS256")
    except:
        return 'invalid'

    current_user = User.query.filter_by(id=data['id']).first()
    if current_user.admin:
        return current_user
    return False


def generateToken(self):
    payload = {
        'id': self.id,
        'name': self.username,
        'role': self.admin,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2)
    }
    accessToken = jwt.encode(payload, Secretkey, algorithm="HS256")
    return accessToken
