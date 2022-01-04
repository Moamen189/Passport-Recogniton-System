from flask_restful import fields

mysql = {'host': 'loclhost',
         'user': 'root',
         'passwd': '',
         'db': 'test'}

mysqlconfig = 'mysql+pymysql://root:@localhost:3306/test' #change this later
Secretkey = 'ThisIsAReallyHardToGuessSecret!'
resource_fields = {
    'Country': fields.String,
    'Name': fields.String,
    'Surname': fields.String,
    'Sex': fields.String,
    'DateOfBirth': fields.Integer,
    'Nationality': fields.String,
    'ExpirationDate': fields.Integer,
    'Number': fields.String,
    'Status': fields.Boolean,
    'Problem': fields.String
}
upload_path = './tempUpload'


