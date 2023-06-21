import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const priceModelList: GetList[] = [
  { id: 1, name: 'FixedBid' },
  { id: 2, name: 'Retainer' },
  { id: 3, name: 'Support' },
  { id: 4, name: 'T&M' },
]
export const healthList = [
  {
    label: 'Gray',
    name: 'Project not yet started',
    backgroundColor: 'opt-bg-gray',
  },
  { label: 'Green', name: 'Good', backgroundColor: 'opt-bg-green' },
  { label: 'Orange', name: 'Critical', backgroundColor: 'opt-bg-orange' },
  { label: 'Red', name: 'Danger', backgroundColor: 'opt-bg-danger' },
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

export const reviewListStatus = [
  { label: 'Select Status', name: 'Select Status' },
  { label: 'Completed', name: 'Completed' },
  { label: 'Needs Discussion', name: 'Needs Discussion' },
  { label: 'Needs Acknowledgement', name: 'Acknowledgement' },
  { label: 'Review Pending', name: 'Review Pending' },
  { label: 'Not-Submitted', name: 'Not-Submitted' },
]

export const employeeStatus = [
  { label: 'Active', name: 'Active' },
  { label: 'Inactive', name: 'Inactive' },
]

export const reviewRatings = [
  {
    value: 0,
    text: '0',
  },
  {
    value: 1,
    text: '1',
  },
  {
    value: 2,
    text: '2',
  },
  {
    value: 3,
    text: '3',
  },
  {
    value: 4,
    text: '4',
  },
  {
    value: 5,
    text: '5',
  },
  {
    value: 6,
    text: '6',
  },
  {
    value: 7,
    text: '7',
  },
  {
    value: 8,
    text: '8',
  },
  {
    value: 9,
    text: '9',
  },
  {
    value: 10,
    text: '10',
  },
]

export const emptyString = ''
export const regexNumberOnly = /\D/g

//returns true if from date is greater the toDate
export const compareFromAndToDate = (fromDate: string, toDate: string) => {
  const toD = Date.parse(toDate)
  const fromD = Date.parse(fromDate)
  return fromD > toD
}
