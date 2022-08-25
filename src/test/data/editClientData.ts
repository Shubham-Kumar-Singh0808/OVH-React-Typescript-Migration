import {
  Client,
  ClientCountry,
} from '../../types/ProjectManagement/Clients/clientsTypes'

export const mockEditClient: Client = {
  id: 18,
  clientCode: '000',
  name: 'Raybiztech',
  address: "KavuriHill's",
  personName: 'Ajay Gupta',
  email: 'ajay.gupta@raybiztech.com',
  country: 'INDIA',
  phone: '91-9878685848',
  description: 'Testing',
  organization: 'Ray Business Technologies',
  totalFixedBids: 0,
  totalRetainers: 0,
  clientStatus: true,
  gstCode: '2347987522',
}

export const mockGetClientCountries: ClientCountry[] = [
  {
    id: 5,
    name: 'AUSTRALIA',
    code: null,
  },

  {
    id: 1,
    name: 'INDIA',
    code: null,
  },

  {
    id: 2,
    name: 'USA',
    code: null,
  },
]
