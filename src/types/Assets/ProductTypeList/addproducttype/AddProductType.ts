import { ApiLoadingState } from '../../../../middleware/api/apiList'

export type ManufacturerList = {
  assetTypeList: AssetTypeList[]
  manufacturerList: ManufactureData[]
  productList: ProductList[]
  vendorList: VendorList[]
}

export type EmpDepartment = {
  allocationSupportFlag: boolean
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
}

export type AssetTypeList = {
  assetType: string
  empDepartment: EmpDepartment
  id: number
}
export type product = {
  assetType: AssetTypeList
  createdBy: number | string | null
  createdDate: createdDate | null
  empDepartment: EmpDepartment
  productId: number
  productName: string
  updatedBy: string | number | null
  updatedDate: updatedDate | null
}

export type ManufactureData = {
  createdBy: number | string | null
  createdDate: createdDate | null
  empDepartment: EmpDepartment
  manufacturerId: number
  manufacturerName: string
  product: product
  updatedBy: string | number | null
  updatedDate: updatedDate | null
}
export type ProductList = {
  assetType: AssetTypeList
  createdBy: string | number | null
  createdDate: createdDate | null
  empDepartment: EmpDepartment
  productId: number
  productName: string
  updatedBy: number | null
  updatedDate: updatedDate | null
}
export type VendorList = {
  createdBy: number | string | null
  createdDate: createdDate | null
  empDepartment: EmpDepartment
  isExpenseVendor: boolean
  updatedBy: string | number | null
  updatedDate: updatedDate | null
  vendorAddress: string
  vendorBankDetails: null | string
  vendorCity: string
  vendorCountry: string
  vendorEmailId: string
  vendorFaxNumber: null | string
  vendorGSTNumber: null | string
  vendorId: number
  vendorName: string
  vendorPhoneNumber: string
  vendorPincode: string
  vendorState: string
}

export type AddProductTypeSliceState = {
  manufacturerList: ManufacturerList
  isLoading: ApiLoadingState
}

export type AddProductTypes = {
  assetTypeId: string
  productName: string
}
export type AddProductTypeButton = {
  backButtonHandler: () => void
}
export type UpdateProductTypeRecordTypes = {
  assetTypeId: number
  assetType: string
  createdBy: number | string | null
  createdDate: string
  departmentId: string | null
  departmentName: string | null
  productId: number
  productName: string
  updatedBy: string | number | null
  updatedDate: string | number | null
}

export type calendar = {
  javaDate: number
  timeInMillis: number
  lenient: boolean
}
export type yearOfEra = {
  unit: string
  value: number
  index: number
}
export type monthOfYear = {
  unit: string
  value: number
  index: number
}
export type hourOfDay = {
  unit: string
  value: number
  index: number
}
export type minuteOfHour = {
  unit: string
  value: number
  index: number
}
export type secondOfMinute = {
  unit: string
  value: number
  index: number
}
export type partsOfTime = {
  unit: string
  value: number
  index: number
}

export type dayOfMonth = {
  unit: string
  value: number
  index: number
}
export type updatedDate = {
  calendar: calendar
  timeUnit: string
  yearOfEra: yearOfEra
  monthOfYear: monthOfYear
  hourOfDay: hourOfDay
  minuteOfHour: minuteOfHour
  secondOfMinute: secondOfMinute
  partsOfTime: partsOfTime[]
  dayOfMonth: dayOfMonth
  javaDate: number
}

export type createdDate = {
  calendar: calendar
  timeUnit: string
  yearOfEra: yearOfEra
  monthOfYear: monthOfYear
  hourOfDay: hourOfDay
  minuteOfHour: minuteOfHour
  secondOfMinute: secondOfMinute
  partsOfTime: partsOfTime[]
  dayOfMonth: dayOfMonth
  javaDate: number
}
