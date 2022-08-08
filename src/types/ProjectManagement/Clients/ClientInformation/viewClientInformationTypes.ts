import { ValidationError, LoadingState } from '../../../commonTypes'

export type ClientInformation = {
  id: number
  clientCode: string
  name: string
  address: string
  personName: string
  email: string
  country: string
  phone: string | null
  description: string
  organization: string
  totalFixedBids: number
  totalRetainers: number
  clientStatus: boolean
  gstCode: number | null
}

export type ClientInformationSliceState = {
  viewClientInformation: ClientInformation
  isLoading: LoadingState
  error: ValidationError
}
