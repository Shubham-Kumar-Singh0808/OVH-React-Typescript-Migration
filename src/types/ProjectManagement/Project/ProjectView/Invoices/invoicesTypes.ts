import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type InvoicesList = {
  CRList: []
  milestoneList: MilestoneList[]
}

export type MilestoneList = {
  id: number
  title: string
  milestoneNumber: null
  planedDate: null
  actualDate: null
  billable: null
  comments: null
  project: string
  client: string
  projectId: number
  isClosed: true
  milestonePercentage: string
  milestonePeopleDTO: null
  allocatedMilestonePeople: null
  crId: null
  crName: null
  crDuration: null
  invoiceStatus: true
  projectType: string
  effort: null
  invoiceReopenFlag: null
  enableReopenFlag: null
  invoiceExits: null
  milestoneTypeFlag: null
  milestoneAmount: null
  raisedInvoicePercentage: string
  remainingPercentage: string
}

export type InvoicesOfMilestoneList = {
  listSize: number
  list: InvoicesOfMilestone[]
}

export type InvoicesOfMilestone = {
  invoiceId: number
  invoicNumber: string
  number: string
  poNumber: null
  clientName: string
  clientId: number
  contactPersonName: string
  projectName: string
  projectId: number
  projectManager: string
  deliveryManager: string
  milestoneName: string
  milestoneNumber: string
  milestoneId: number
  milestonePercentage: string
  milestonePlannedEndDate: string
  milestoneActualEndDate: string
  milestoneComments: string
  crId: null
  crName: null
  crDuration: null
  invoiceStatus: string
  raisedDate: string
  dueDate: string
  invoiceAmountReceviedDate: string
  totalAmount: number
  subtotal: string
  showNotesOnInvoice: false
  organization: string
  companyAddress: string
  currencyType: string
  bankName: string
  location: string
  wireTransferInstructions: string
  projectType: string
  genarateType: null
  invoiceFileName: null
  numberInWords: string
  plannedDate: string
  actualDate: string
  amount: string
  amountAfterDiscount: string
  percentage: string
  invoiceAmountSentDate: string
  discountRate: string
  discountType: null
  discount: string
  projectOrCRNumbers: null
  statusNotes: string
  customTextOnPDF: null
  invoiceDeletable: true
  lineitem: Lineitem[]
  roleDtos: RoleDtos[]
  taxDTO: []
  reminderSize: number
  totalReceivedAmount: string
  countTypeToDisplay: string
  showTaxDetailsOnInvoice: null
  onlybodyContent: null
  finalTotalAmount: number
  rate: number
  pendingAmount: number
  compAddress: string
  companyName: string
  conversionRate: null
  gstCode: null
  billingContactPerson: string
  billingContactPersonEmail: string
  tdsAmount: null
  netAmount: null
  modifiedMilestoneName: null
  milestoneTypeFlag: null
  proformaInvoiceFlag: null
  clientCountry: string
  country: string
  notes: string
}

export type Lineitem = {
  id: string
  item: null
  empId: string
  description: null
  duration: string
  monthWorkingDays: string
  holidays: string
  leaves: string
  count: string
  rate: string
  amount: string
  empName: string
  role: string
  flag: null
  fromDate: string
  endDate: string
  comments: null
  hours: string
  totalValue: string
  billableDays: string
  lineItemAmount: null
}
export type RoleDtos = {
  role: string
  numberOfResources: number
  durationcount: number
  duration: string
  rate: string
  amount: string
}

export type invoicesListSlice = {
  invoicesList: InvoicesList
  milestoneList: MilestoneList[]
  isLoading: ApiLoadingState
  invoicesOfMilestoneList: InvoicesOfMilestoneList
}
