import { LoadingState, ValidationError } from '../../commonTypes'

export type AuthorizedEmployee = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}

export type EmployeeDetails = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}

export type CategoryListResponse = {
  id: number
  categoryName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
}

export type SubCategoryListResponse = {
  id: number
  categoryId: number
  categoryName: string
  subCategoryName: string
  createdBy: string
  updatedBy: string | null
  createdDate: string
  updatedDate: string | null
}

export type ProjectsListResponse = {
  id: number
  projectName: string
  managerId: number
  startdate: string
  enddate: string
  description: null
  status: string
  managerName: string
  count: null
  billable: boolean
  isAllocated: null
  employeeId: null
  health: null
  client: null
  type: null
  clientId: null
  projectStartdate: null
  projectEndDate: null
  requiredResources: null
  newClient: null
  requestedBy: null
  statuEditFlag: null
  technology: null
  address: null
  personName: null
  email: null
  country: null
  organization: null
  intrnalOrNot: null
  hiveProjectName: null
  cc: null
  bcc: null
  deliveryManager: null
  projectRequestId: null
  model: null
  checkListExist: null
  projectCode: null
  projectContactPerson: null
  projectContactEmail: null
  billingContactPerson: null
  billingContactPersonEmail: null
  projectRequestMilestoneDTO: null
  platform: null
  domain: null
  clientName: null
  hiveProjectFlag: null
  allocation: null
}

export type CurrencyListResponse = {
  id: number
  type: string
}

export type EmpDepartmentListResponse = {
  departmentId: number
  departmentName: string
  supportManagementFlag: boolean
  allocationSupportFlag: boolean
}

export type PaymentListResponse = {
  id: number
  paymentType: string
}

export type CountriesListResponse = {
  id: number
  name: string
  mobileCode: string
  countryCode: string
}

export type VendorListResponse = {
  vendorId: number
  vendorName: string
  vendorAddress: string
  vendorCity: string
  vendorState: string
  vendorPincode: string
  vendorCountry: string
  vendorEmailId: string
  vendorPhoneNumber: string
  vendorFaxNumber: string
  departmentId: number
  departmentName: string
  createdBy: string
  updatedBy: string
  createdDate: string
  updatedDate: string
  isExpenseVendor: boolean
  vendorBankDetails: string
  vendorGSTNumber: string
}

export type CreditCardListResponse = {
  cardId: number | string
  cardName: string
  cardNumber: string
  createdBy: string
  updatedBy: null
  createdDate: string
  updatedDate: null
}

export type EmployeeList = {
  id: number
  firstName: null
  lastName: null
  middleName: null
  designation: null
  role: null
  manager: null
  designationKrasDTO: null
  employeeSubmitted: null
  managerSubmitted: null
  acknowledged: null
  fullName: string
  profilePicPath: null
  thumbPicture: null
  profilePicGeneratedPath: null
  gender: null
  dob: null
  departmentName: null
  employmentTypeName: null
  jobTypeName: null
  imageData: null
  curentLocation: null
  baseLocation: null
  officialBirthday: null
  realBirthday: null
  maritalStatus: null
  emergencyContactName: null
  emergencyPhone: null
  emergencyRelationShip: null
  grade: null
  aboutMe: null
  homeNumber: null
  workNumber: null
  presentAddress: null
  presentCity: null
  presentZip: null
  presentLandMark: null
  permanentAddress: null
  permanentCity: null
  permanentZip: null
  permanentLandMark: null
  mobile: null
  homeCode: null
  workCode: null
  skillList: null
  userName: null
  alternativeMobile: null
  dateOfJoining: null
  informationList: null
  anniversary: null
  bankInformationList: null
  bioAttendanceDtoSet: null
  dates: null
  absentCount: number
  statusName: null
  emergencyContact: null
  relievingDate: null
  observationDTOList: null
  skypeId: null
  percent: null
  passportNumber: null
  passportExpDate: null
  passportIssuedPlace: null
  passportIssuedDate: null
  token: null
  underNoticeDate: null
  candidateId: null
  underNotice: null
  emailId: null
  empManager: null
  bloodgroup: null
  rbtCvPath: null
  rbtCvName: null
  timeSlotDTO: null
  technology: null
  hrAssociate: null
  lateComingCount: null
  passportFrontPagePath: null
  passportBackPagePath: null
  passportFrontPage: null
  passportBackPage: null
  projectManager: null
  casualLeaveCount: number
  lopLeaveCount: number
  holidaysCount: number
  contractExists: null
  contractStartDate: null
  contractEndDate: null
  personalEmail: null
  experience: null
  companyExperience: null
  updatedExperience: null
  country: null
  workStatus: null
  comments: null
  vendorId: null
  vendorName: null
  countryCodeWork: null
  countryCodeMobile: null
  countryCodeHome: null
  countryCodeEmergency: null
  countryCodeAlternative: null
  address: null
}

export type InitialExpenseFormSliceState = {
  isLoading: LoadingState
  error: ValidationError
  categoriesList: CategoryListResponse[]
  empDepartments: EmpDepartmentListResponse[]
  currencyList: CurrencyListResponse[]
  paymentList: PaymentListResponse[]
  countriesList: CountriesListResponse[]
  employeesList: AuthorizedEmployee[]
  subCategoriesList: SubCategoryListResponse[]
  projectsList: ProjectsListResponse[]
  vendorsList: VendorListResponse[]
  creditCardsList: CreditCardListResponse[]
  addExpensesList: AddExpenseResponse
  expensesList: GetExpenseFormDetailsResponse[]
}

export type EmployeeDetailsResponse = {
  aboutMe: null | string
  absentCount: number
  acknowledged: null | string
  address: null | string
  alternativeMobile: null | string
  anniversary: null | string
  bankInformationList: null | string
  baseLocation: null | string
  bioAttendanceDtoSet: null | string
  bloodgroup: null | string
  candidateId: null | string
  casualLeaveCount: number
  comments: null | string
  companyExperience: null | string
  contractEndDate: null | string
  contractExists: null | string
  contractStartDate: null | string
  country: null | string
  countryCodeAlternative: null | string
  countryCodeEmergency: null | string
  countryCodeHome: null | string
  countryCodeMobile: null | string
  countryCodeWork: null | string
  curentLocation: null | string
  dateOfJoining: null | string
  dates: null | string
  departmentName: null | string
  designation: null | string
  designationKrasDTO: null | string
  dob: null | string
  emailId: null | string
  emergencyContact: null | string
  emergencyContactName: null | string
  emergencyPhone: null | string
  emergencyRelationShip: null | string
  empManager: null | string
  employeeSubmitted: null | string
  employmentTypeName: null | string
  experience: null | string
  firstName: null | string
  fullName: string
  gender: null | string
  grade: null | string
  holidaysCount: number
  homeCode: null | string
  homeNumber: null | string
  hrAssociate: null | string
  id: number
  imageData: null | string
  informationList: null | string
  jobTypeName: null | string
  lastName: null | string
  lateComingCount: null | string
  lopLeaveCount: number
  manager: null | string
  managerSubmitted: null | string
  maritalStatus: null | string
  middleName: null | string
  mobile: null | string
  observationDTOList: null | string
  officialBirthday: null | string
  passportBackPage: null | string
  passportBackPagePath: null | string
  passportExpDate: null | string
  passportFrontPage: null | string
  passportFrontPagePath: null | string
  passportIssuedDate: null | string
  passportIssuedPlace: null | string
  passportNumber: null | string
  percent: null | string
  permanentAddress: null | string
  permanentCity: null | string
  permanentLandMark: null | string
  permanentZip: null | string
  personalEmail: null | string
  presentAddress: null | string
  presentCity: null | string
  presentLandMark: null | string
  presentZip: null | string
  profilePicGeneratedPath: null | string
  profilePicPath: null | string
  projectManager: null | string
  rbtCvName: null | string
  rbtCvPath: null | string
  realBirthday: null | string
  relievingDate: null | string
  role: null | string
  skillList: null | string
  skypeId: null | string
  statusName: null | string
  technology: null | string
  thumbPicture: null | string
  timeSlotDTO: null | string
  token: null | string
  underNotice: null | string
  underNoticeDate: null | string
  updatedExperience: null | string
  userName: null | string
  vendorId: null | string
  vendorName: null | string
  workCode: null | string
  workNumber: null | string
  workStatus: null | string
}

export type GetExpenseListResponse = {
  amount: string
  amountInINR: string
  categoryId: number
  categoryName: string
  chequeDate: string
  chequeNumber: string
  country: string
  createdBy: string
  createdDate: string
  creditCardDetails: null | string
  currencyId: number
  currencyType: string
  deptId: number
  deptName: string
  description: string
  empId: number
  expenditureDate: string
  expenseNumber: string
  formId: number
  invoiceNumber: null
  isAutogenerated: null | boolean
  isReimbursable: boolean
  paymentMode: string
  paymentStatus: string
  project: ProjectsListResponse
  purpose: string
  remainingAmount: null | string
  saltKey: null
  subCategoryId: number
  subCategoryName: string
  toEmployee: EmployeeDetailsResponse
  updatedBy: string
  updatedDate: string
  vendor: VendorListResponse
  voucherNumber: string
}

export type GetExpenseFormDetailsResponse = {
  size: number
  list: GetExpenseListResponse[]
  totalExpenseAmount: string
}

export type AddExpenseParams = {
  categoryId: number
  country: string
  dateSelection: string
  departmentId: number
  endIndex: number
  from: string
  multipleSearch: string
  paymentMode: string
  startIndex: number
  subCategoryId: number
  to: string
}

export type AddExpenseResponse = {
  amount: number
  categoryId: number
  country: string
  creditCardDetails: CreditCardListResponse
  currencyId: number
  deptId: number
  description: string
  expenditureDate: string
  invoiceNumber: number
  isReimbursable: boolean
  paymentMode: string
  project: ProjectsListResponse
  purpose: string
  subCategoryId: number
  toEmployee: AuthorizedEmployee
  vendor: VendorListResponse
  voucherNumber: number
}

export type expenseFormFields = {
  employee: boolean
  projects: boolean
  date: boolean
}

export type GetAutoCompleteList = {
  id: number
  name: string
}

export type GetOnSelect = {
  id: number
  name: string
}

export enum CheckedCreditCardOptions {
  cardName = 'cardName',
}
