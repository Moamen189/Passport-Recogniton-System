from flask import abort, Response
from flask_restful import Resource, marshal_with
from config import resource_fields
import json
from errors.errors import Errors
from errors.jwtauth import isAuthorized
from models.passports import PassportModel
from db import db


# class for viewing all passports stored in database
class AdminAllPassports(Resource):

    @marshal_with(resource_fields)
    def get(self):
        current_user = isAuthorized()
        if not current_user:
            Unauthorizedmessage = json.dump({'Message': 'Unauthorized action!'})
            abort(Response(Unauthorizedmessage, 403))
        if current_user == 'invalid':
            Invalidmessage = json.dumps({'Message': 'Token is invalid!'})
            abort(Response(Invalidmessage, 401))
        if current_user == 'missing':
            Missingmessage = json.dumps({'Message': 'Token is missing!'})
            abort(Response(Missingmessage, 401))
        result = PassportModel.query.all()
        return result


#################################

# class for doing CRUD operations
class AdminCRUD(Resource):

    @marshal_with(resource_fields)
    def get(self, passport_number):
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
        Errors.isNumFound(passport_number)
        result = PassportModel.query.filter_by(Number=passport_number).first()
        return result

    def delete(self, passport_number):
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
        Errors.isNumFound(passport_number)
        passport = PassportModel.query.filter_by(Number=passport_number).first()
        db.session.delete(passport)
        db.session.commit()
        return '', 204
