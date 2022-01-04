from passporteye import read_mrz


class Detection:
    def PassportDetection(image):
        mrz = read_mrz(image)
        # converting the data to python dictionary
        mrz_data = mrz.to_dict()
        values = {
            'Country': mrz_data['country'],
            'Name': mrz_data['names'],
            'Surname': mrz_data['surname'],
            'Sex': mrz_data['sex'],
            'DateOfBirth': mrz_data['date_of_birth'],
            # 'Personal Number': mrz_data['personal_number'],
            'Nationality': mrz_data['nationality'],
            'ExpirationDate': mrz_data['expiration_date'],
            'Number': mrz_data['number'],
            'ExpirationDateValid': mrz_data['valid_expiration_date'],
            'DateOfBirthValid': mrz_data['valid_date_of_birth'],
            'NumberValid': mrz_data['valid_number'],
            'Status': False
        }
        return values
