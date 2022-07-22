import {
  Country,
  VisaType,
} from '../../types/EmployeeDirectory/VisaList/visaListTypes'

export const mockCountries: Country[] = [
  {
    id: 1,
    name: 'AUSTRALIA',
  },
  {
    id: 2,
    name: 'INDIA',
  },
  {
    id: 3,
    name: 'USA',
  },
  {
    id: 4,
    name: 'CANADA',
  },
  {
    id: 5,
    name: 'PHILIPPINES',
  },
]

export const mockVisaTypes: VisaType[] = [
  {
    visaTypeId: BigInt(6),
    visaType: 'Business Visa',
    countryId: BigInt(1),
    countryName: 'AUSTRALIA',
  },
  {
    visaTypeId: BigInt(7),
    visaType: 'Short Term Work Permit',
    countryId: BigInt(1),
    countryName: 'AUSTRALIA',
  },
  {
    visaTypeId: BigInt(8),
    visaType: 'Permanent Resident',
    countryId: BigInt(1),
    countryName: 'AUSTRALIA',
  },
]
