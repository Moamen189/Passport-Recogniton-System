from flask_restful import Resource, reqparse
import jwt
from models.users import User
from config import Secretkey


# class for validating JWT for more secure handling in the front end side
class TokenValidate(Resource):
    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('token', required=True)
        args = parse.parse_args()
        try:
            data = jwt.decode(args['token'], Secretkey, algorithms="HS256")
            current_user = User.query.filter_by(id=data['id']).first()
        except:
            return False
        if current_user.admin:
            return True
        return False



