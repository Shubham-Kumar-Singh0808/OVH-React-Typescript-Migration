import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeDetails = {
  activeCyle: string
  designation: string
  employeeId: number
  fullName: string
  joinDate: string
  pan: string
}

export type Investment = {
  id: number
  investmentId: string
  customAmount: string
  description: string | null
  requiredDocs: string
}

export type Invest = {
  investmentId: number
  investmentName: string
  maxLimit: number
  description: string | null
  requiredDocs: string
  sectionId: number
  sectionName: string
}

export interface ITDeclarationModal {
  showModal: boolean
  modalDescription: string
}

export type Sections = {
  sectionId: number
  sectionName: string
  sectionLimit: number
  invests: Invest[]
}

export type FormInvestmentDTO = {
  customAmount: string
  investmentId: number
}

export type FormSectionsDTO = {
  isOld: boolean
  itSectionsId: null
  sectionId: number
  sectionName: string
  formInvestmentDTO: FormInvestmentDTO[]
}

export type submitITDeclarationForm = {
  designation: string
  employeeId: number
  employeeName: string
  fromDate: string
  grandTotal: number
  isAgree: boolean
  itDeclarationFormId: null
  organisationName: string
  panNumber: string
  toDate: string
  formSectionsDTOs: FormSectionsDTO[]
}

export type ITDeclarationFormSliceState = {
  employeeDetails: EmployeeDetails
  sections: Sections[]
  investments: Invest[]
  submitITDeclarationForm: submitITDeclarationForm
  itDeclarationFormId: number
  itDeclarationFormExist: boolean
  isLoading: LoadingState
  error: ValidationError
  grandTotal: number
  formSectionData: FormSectionsDTO[]
  isSubmitButtonEnabled: boolean
  modal: ITDeclarationModal
  uploadedDocumentId: number
}

export type itDeclarationFormSectionList = {
  formInvestmentDTO: Investment[]
  isOld?: boolean
  itSectionsId?: null
  sectionId: number
  sectionName: string
  sectionLimit: number
  invests: Invest[]
}

export interface UploadITDocumentDTO {
  documentId: number
  document: FormData | string
}
