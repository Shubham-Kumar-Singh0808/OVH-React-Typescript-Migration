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
  cardId: number
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
}

export type AddExpenseFormResponse = {
  formId: number
  expenseNumber: string
  toEmployee: EmployeeList
  categoryId: number
  categoryName: string
  subCategoryId: number
  subCategoryName: string
  deptId: number
  deptName: string
  project: ProjectsListResponse
  vendor: VendorListResponse
  purpose: string
  expenditureDate: string
  country: string
  currencyId: number
  currencyType: string
  paymentMode: string
  creditCardDetails: CreditCardListResponse
  chequeNumber: null | string
  chequeDate: null | string
  voucherNumber: string
  amount: string
  description: null | string
  isReimbursable: boolean
  empId: number
  saltKey: null
  paymentStatus: null
  remainingAmount: null
  amountInINR: string
  createdBy: string
  createdDate: string
  updatedBy: string
  updatedDate: string
  invoiceNumber: null | string
  isAutogenerated: null
}

export type AddExpenseFormDetailsResponse = {
  size: number
  list: AddExpenseFormResponse[]
  totalExpenseAmount: string
}

export type AddExpenseProps = {
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
