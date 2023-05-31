import { LoadingState, ValidationError } from '../../../commonTypes'

export type Department = {
  id: number
  name: string
}

export type AddVendor = {
  departmentId: string
  isExpenseVendor: boolean
  vendorAddress: string
  vendorBankDetails: string
  vendorCity: string
  vendorCountry: string
  vendorEmailId: string
  vendorFaxNumber: string
  vendorGSTNumber: string
  vendorName: string
  vendorPhoneNumber: string
  vendorPincode: string
  vendorState: string
}

export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => Label
}

export type Label = {
  htmlFor: string
  className: string
}

export interface InputTypeHandlerProps {
  name: string
  label: string
  placeHolder: string
  nameValue: string
}

export interface AddNewVendorSliceState {
  department: Department[]
  addVendorDetails: AddVendor
  isLoading: LoadingState
  error: ValidationError
}
