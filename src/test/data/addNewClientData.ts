import {
  AddClientDetails,
  ClientCountry,
} from '../../types/ProjectManagement/Clients/AddClient/addNewClientTypes'

export const mockClientCountries: ClientCountry[] = [
  {
    id: 5,
    name: 'AUSTRALIA',
    code: null,
  },
  {
    id: 7,
    name: 'Canada',
    code: null,
  },
  {
    id: 9,
    name: 'France',
    code: null,
  },
  {
    id: 1,
    name: 'INDIA',
    code: null,
  },
  {
    id: 6,
    name: 'New Zealand',
    code: null,
  },
  {
    id: 8,
    name: 'SouthAfrica',
    code: null,
  },
  {
    id: 4,
    name: 'UAE',
    code: null,
  },
  {
    id: 3,
    name: 'UK',
    code: null,
  },
  {
    id: 2,
    name: 'USA',
    code: null,
  },
]

export const mockAddNewClient: AddClientDetails = {
  clientCode: '000',
  name: 'Raybiztech',
  address: 'KavuriHills',
  personName: 'Ajay Gupta',
  email: 'ajay.gupta@raybiztech.com',
  country: 'INDIA',
  phone: '91-8979872345',
  description: 'Testing',
  organization: 'Ray Business Technologies',
  clientStatus: true,
  gstCode: '23441234324',
}
