from flask import abort, Response
from flask_restful import Resource, reqparse
from errors.errors import Errors
from errors.jwtauth import isAuthorized, generateToken
from werkzeug.security import generate_password_hash, check_password_hash
import json
from models.users import User
from db import db

# globally used parameters
adminParse = reqparse.RequestParser()
adminParse.add_argument('username', required=True)
adminParse.add_argument('password', required=True)


###############################################

class AdminCreate(Resource):

    def post(self):
        current_user = isAuthorized()
        if not current_user:
            Unauthorizedmessage = json.dumps({'Message': 'Unauthorized action!'})
            abort(Response(Unauthorizedmessage, 403))
        if current_user == 'invalid':
            Invalidmessage = json.dumps({'Message': 'Token is invalid!'})
            abort(Response(Invalidmessage, 401))
        if current_user == 'missing':
            Missingmessage = json.dumps({'Message': 'Token is missing!'})
            abort(Response(Missingmessage, 401))
        adminArgs = adminParse.parse_args()
        if Errors.isEmpty(adminArgs['username']) or Errors.isEmpty(adminArgs['password']):
            Emptymessage = json.dumps({'Message': 'Parameters can\'t be empty'})
            abort(Response(Emptymessage, 403))
        hashed_password = generate_password_hash(adminArgs['password'], method='sha256')
        try:
            new_user = User(username=adminArgs['username'], password=hashed_password, admin=True)
            db.session.add(new_user)
            db.session.commit()
        except:
            Existsmessage = json.dumps({'Message': 'This username exists!'})
            abort(Response(Existsmessage, 409))
        user = User.query.filter_by(username=adminArgs['username']).first()
        accessToken, refreshToken = generateToken(user)
        return {'Status': 'New user has been created!',
                'Token': accessToken
                }, 201


#####################################

# class for authenticating as admin to get jwt token and perform critical actions
class AdminAuth(Resource):

    def post(self):

        adminArgs = adminParse.parse_args()
        user = User.query.filter_by(username=adminArgs['username']).first()
        Credsmessage = json.dumps({'Message': 'Bad login credentials'})
        if not user:
            # abort(401, message='Bad login credentials')
            abort(Response(Credsmessage, 403))
        if check_password_hash(user.password, adminArgs['password']):
            accessToken = generateToken(user)
            return accessToken, 200
        abort(Response(Credsmessage, 403))
