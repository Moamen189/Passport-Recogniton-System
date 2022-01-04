from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from config import mysqlconfig
from routes.passport import PassportUpload
from routes.adminauth import AdminAuth, AdminCreate
from routes.admincrud import AdminCRUD, AdminAllPassports
from routes.jwtvalid import TokenValidate

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = mysqlconfig


@app.before_first_request
def create_tables():
    from db import db
    db.init_app(app)
    db.create_all()


# api routes
api.add_resource(AdminAuth, "/api/auth/login")
api.add_resource(AdminCreate, "/api/auth/register")
api.add_resource(PassportUpload, "/api/upload")
api.add_resource(AdminAllPassports, "/api/admin/passports/")
api.add_resource(AdminCRUD, "/api/admin/passports/<passport_number>")
api.add_resource(TokenValidate, "/api/auth/token")


if __name__ == '__main__':
    app.run(debug=True)
