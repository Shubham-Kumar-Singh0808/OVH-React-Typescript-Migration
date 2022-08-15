import { GetAllReportingManagers } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  Domains,
  Managers,
  PlatForms,
  Project,
} from '../../types/ProjectManagement/Project/AddProject/AddProjectTypes'

export const mockProjectManagerList: GetAllReportingManagers[] = [
  {
    id: 1595,
    firstName: 'Elizabeth',
    lastName: 'Arland',
    fullName: 'Elizabeth Arland',
  },
  {
    id: 1872,
    firstName: 'Jagadish',
    lastName: 'Suresh Muddamsetty',
    fullName: 'Jagadish Suresh Muddamsetty',
  },
  {
    id: 1959,
    firstName: 'Omer',
    lastName: 'Mohsin',
    fullName: 'Omer Mohsin',
  },
  {
    id: 1993,
    firstName: 'Hr',
    lastName: 'H',
    fullName: 'Hr H',
  },
  {
    id: 1997,
    firstName: 'Hr',
    lastName: 'Manager',
    fullName: 'Hr Manager',
  },
  {
    id: 2028,
    firstName: 'Ricky',
    lastName: 'Ocaba',
    fullName: 'Ricky Ocaba',
  },
  {
    id: 2030,
    firstName: 'Ricky',
    lastName: 'Ocaba',
    fullName: 'Ricky Ocaba',
  },
]

export const mockPlatform: PlatForms[] = [
  { id: 1, name: 'Java' },
  { id: 2, name: '.Net' },
  { id: 3, name: 'PHP' },
  { id: 4, name: 'Mobile' },
  { id: 5, name: 'Dynamics CRM' },
  { id: 6, name: 'Dynamics AX' },
  { id: 7, name: 'Kentico' },
  { id: 8, name: 'Sitecore' },
  { id: 9, name: 'Xamarin' },
  { id: 10, name: 'MVC' },
  { id: 11, name: 'WCF' },
  { id: 12, name: 'Salesforce' },
  { id: 13, name: 'Testing' },
  { id: 14, name: 'Sitefinity' },
  { id: 15, name: 'Others' },
]

export const mockProject: Project = {
  id: 330,
  projectName: 'test',
  managerId: 1425,
  startdate: '01/08/2022',
  enddate: '01/08/2022',
  description: '<p>hjhv6</p>',
  status: 'In Progress',
  managerName: 'Sandeep Kumar',
  billable: false,
  health: 'Green',
  client: 'Cenveo Corp',
  type: 'FIXEDBID',
  statuEditFlag: 'exist',
  intrnalOrNot: true,
  hiveProjectName: 'Miss Universe',
  projectRequestId: 207,
  model: 'DEVELOPMENT',
  projectContactPerson: 'Ricky Gwapo',
  projectContactEmail: 'ocabafox@gmail.com',
  billingContactPerson: 'ocabafox the fox',
  billingContactPersonEmail: 'ocaba.ricky@gmail.com',
  platform: 'Java',
  domain: 'Banking',
  clientName: 'Cenveo Corp',
  hiveProjectFlag: false,
}

export const mockManager: Managers[] = [
  { id: 1002, firstName: 'Chaitanya', lastName: 'Mudunuri', middleName: '' },
  { id: 1004, firstName: 'Amit', lastName: 'Singh', middleName: '' },
  { id: 1057, firstName: 'Pradeep', lastName: 'Namburu', middleName: '' },
  { id: 1076, firstName: 'Srinivas', lastName: 'Suppala', middleName: '' },
  { id: 1092, firstName: 'Vasu', lastName: 'Yerramsetti', middleName: '' },
  { id: 1156, firstName: 'Sarthak', lastName: 'Samantara', middleName: '' },
  { id: 1160, firstName: 'Rajesh', lastName: 'Chungath', middleName: '' },
  { id: 1165, firstName: 'Swapna', lastName: 'Narayandas', middleName: '' },
  { id: 1259, firstName: 'Naveen', lastName: 'Kunchakuri', middleName: '' },
  { id: 1375, firstName: 'Vijendar', lastName: 'Kandi', middleName: '' },
  { id: 1419, firstName: 'Pavan', lastName: 'Kumbhar', middleName: '' },
  { id: 1425, firstName: 'Sandeep', lastName: 'Kumar', middleName: '' },
  { id: 1456, firstName: 'Thirupathi', lastName: 'Chindam', middleName: '' },
  { id: 1502, firstName: 'Venubabu', lastName: 'Sunkara', middleName: '' },
]

export const mockDomain: Domains[] = [
  { id: 1, name: 'Retail' },
  { id: 2, name: 'Insurance' },
  { id: 3, name: 'Healthcare' },
  { id: 4, name: 'Banking' },
  { id: 5, name: 'Finance' },
  { id: 6, name: 'Manufacturing' },
  { id: 7, name: 'Broadcasting and Media' },
  { id: 8, name: 'Education' },
  { id: 9, name: 'Others ' },
]
