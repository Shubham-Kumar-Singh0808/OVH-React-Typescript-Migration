import { VisaDetails } from '../../types/MyProfile/PersonalInfoTab/personalInfoTypes'

export const mockVisaTableDetails: VisaDetails[] = [
  {
    id: BigInt(20),
    empId: BigInt(98),
    empName: 'vinesh',
    countryName: 'AUSTRALIA',
    visaType: 'Business Visa',
    dateOfIssue: new Date('02/03/2022'),
    dateOfExpire: new Date('23/03/2022'),
    visaTypeId: BigInt(2),
    countryId: BigInt(6),
  },
]
