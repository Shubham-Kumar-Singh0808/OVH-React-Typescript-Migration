import { LoadingState, ValidationError } from '../../../commonTypes'

export type ClientCountry = {
  id: number
  name: string
  code: null | number
}

export type AddClientDetails = {
  address: string
  clientCode: string
  clientStatus: boolean
  country: string
  email: string
  gstCode: string
  name: string
  organization: string
  personName: string
  phone: string
  description: string
}

export type AddNewClientSliceState = {
  clientCountries: ClientCountry[]
  addClientDetails: AddClientDetails
  isLoading: LoadingState
  error: ValidationError
}
