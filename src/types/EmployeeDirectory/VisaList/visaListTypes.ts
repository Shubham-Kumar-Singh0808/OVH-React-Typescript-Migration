import { ApiLoadingState } from '../../../middleware/api/apiList'

export type GetVisaListApiProps = {
  startIndex?: number
  endIndex?: number
  multipleSearch?: string
  countryId?: number | string
  visaTypeId?: number | string
}

export type VisaDetailsDto = {
  id: bigint
  empId: bigint
  empName: string
  visaTypeId?: bigint
  visaType: string
  countryId: bigint
  countryName: string
  dateOfIssue: Date
  dateOfExpire: Date
  createdBy: string
  updatedBy?: string
  createdDate: Date
  updatedDate?: Date
  visaDetailsPath?: string
  visaDetailsData?: string
  visaThumbPicture?: string
}

export type VisaListItem = {
  id: bigint
  empName: string
  empId: bigint
  visaDetailsDtos: VisaDetailsDto[]
}

export type GetVisaListResponse = {
  size: number
  list: VisaListItem[]
}

export type Country = {
  id: number
  name: string
}

export type VisaType = {
  visaTypeId: bigint
  visaType: string
  countryId: bigint
  countryName: string
}

export type VisaListSliceState = {
  visaList: VisaListItem[]
  listSize: number
  isLoading: ApiLoadingState
  countries: Country[]
  visaTypes: VisaType[]
}

export type VisaListOptionsProps = {
  selectCountry: string
  setSelectCountry: (value: string) => void
  setFilterByCountry: (value: string) => void
  setFilterByVisaType: (value: string) => void
  setMultiSearchValue: (value: string) => void
  filterByCountry: string
  filterByVisaType: string
  multiSearchValue: string
  setIsAccordionItemShow: (value: boolean) => void
}
