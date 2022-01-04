from flask_restful import Resource, reqparse, abort, marshal_with
from db import db
import cv2
import PIL.Image as Image
import io
import os
from models.passports import PassportModel
import werkzeug
from errors.errors import Errors
from OCR.handler import Detection
from config import resource_fields, upload_path


class PassportUpload(Resource):

    @marshal_with(resource_fields)
    def post(self):
        parse = reqparse.RequestParser()
        parse.add_argument('file', type=werkzeug.datastructures.FileStorage, location='files', required=True)
        args = parse.parse_args()
        if Errors.isEmpty(args['file']):
            abort(401, message='File can\'t be empty')
        vid = args['file']
        vid.save('tempVid.mp4')
        vidCap = cv2.VideoCapture('tempVid.mp4')
        success, image = vidCap.read()
        while success:
            pil_im = Image.fromarray(image)
            b = io.BytesIO()
            pil_im.save(b, 'jpeg')
            im_bytes = b.getvalue()
            try:
                passport = Detection.PassportDetection(im_bytes)  # Performing OCR on image and reading its MRZ code
                break
            except:
                passport = False
                pass
            success, image = vidCap.read()
        vidCap.release()
        os.remove('tempVid.mp4')
        if not passport:
            abort(403, message="Couldn't Recognize Passport")
        if passport['DateOfBirthValid'] and passport['ExpirationDateValid'] and passport['NumberValid']:
            passport['Status'] = True
        counter = 0
        if not passport['DateOfBirthValid']:
            counter += 1
        if not passport['ExpirationDateValid']:
            counter += 2
        if not passport['NumberValid']:
            counter += 4
        result = PassportModel(
            Name=passport['Name'], Surname=passport['Surname'], Country=passport['Country'],
            Sex=passport['Sex'], DateOfBirth=passport['DateOfBirth'],
            Nationality=passport['Nationality'], ExpirationDate=passport['ExpirationDate'],
            Number=passport['Number'], Status=passport['Status'], Problem=counter)
        tempPassport = PassportModel.query.filter_by(Number=passport['Number']).first()
        if tempPassport is not None:
            abort(409, message='This passport has already been uploaded!')
        try:
            db.session.add(result)
            db.session.commit()
        except:
            abort(422, message='Some data might be unreadable due to low quality picture, please take a better one!')
        resPassport = PassportModel.query.filter_by(Number=passport['Number']).first()
        return resPassport
