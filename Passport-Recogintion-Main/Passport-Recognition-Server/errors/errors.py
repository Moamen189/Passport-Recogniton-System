from models.passports import PassportModel

class Errors:

    def isNumFound(self):
        PassportModel.query.filter_by(Number=self).first_or_404(description='No Passport Found With This Number')

    # empty parameters check
    def isEmpty(self):
        if not self:
            return True