import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const priceModelList: GetList[] = [
  { id: 1, name: 'Fixed Bid' },
  { id: 2, name: 'Retainer' },
  { id: 3, name: 'Support' },
  { id: 4, name: 'T&M' },
]
export const healthList = [
  { label: 'Gray', name: 'Project not yet started' },
  { label: 'Green', name: 'Good' },
  { label: 'Orange', name: 'Critical' },
  { label: 'Red', name: 'Danger' },
]

export const ticketStatusList = [
  { label: 'All', name: 'All' },
  { label: 'Closed', name: 'Closed' },
  { label: 'Feedback', name: 'Feedback' },
  { label: 'Fixed', name: 'Fixed' },
  { label: 'In Progress', name: 'In Progress' },
  { label: 'New', name: 'New' },
]

export const approvalStatusList = [
  { label: 'All', name: 'All' },
  { label: 'Approved', name: 'Approved' },
  { label: 'Cancelled', name: 'Cancelled' },
  { label: 'Pending Approval', name: 'Pending Approval' },
  { label: 'Rejected', name: 'Rejected' },
]

export const dateOptionsList = [
  { label: 'Current Month', name: 'Current Month' },
  { label: 'Custom', name: 'Custom' },
  { label: 'Last Month', name: 'Last Month' },
  { label: 'Last Week Approval', name: 'Last Week' },
  { label: 'This Week', name: 'This Week' },
  { label: 'Today', name: 'Today' },
  { label: 'Yesterday', name: 'Yesterday' },
]
