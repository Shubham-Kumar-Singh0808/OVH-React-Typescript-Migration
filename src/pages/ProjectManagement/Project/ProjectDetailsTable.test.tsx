import '@testing-library/jest-dom'
import React from 'react'
import ProjectDetailsTable from './ProjectDetailsTable'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeProjectsDetail } from '../../../test/data/employeeProjectsData'
import { mockProjectReportData } from '../../../test/data/projectReportData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { render, screen } from '../../../test/testUtils'
import { ProjectReport } from '../../../types/ProjectManagement/Project/ProjectTypes'

const deAllocated = 'De-Allocated'
const allocated = 'Allocated'

const mockProject: ProjectReport = {
  id: 330,
  projectName: 'JXT - UI integration',
  managerId: 1259,
  startdate: '29/01/2019',
  enddate: '30/06/2019',
  description: '',
  status: 'In Progress',
  managerName: 'Naveen Kunchakuri',
  count: 6,
  billable: false,
  isAllocated: true,
  employeeId: null,
  health: 'red',
  client: 'JXT Global',
  type: 'RETAINER',
  clientId: 91,
  projectStartdate: null,
  projectEndDate: null,
  requiredResources: null,
  newClient: '',
  requestedBy: null,
  statuEditFlag: null,
  technology: null,
  address: null,
  personName: '',
  email: null,
  country: null,
  organization: '',
  intrnalOrNot: null,
  hiveProjectName: null,
  cc: null,
  bcc: null,
  deliveryManager: 'N/A',
  projectRequestId: 207,
  model: '',
  checkListExist: null,
  projectCode: 'RD20301',
  projectContactPerson: '',
  projectContactEmail: '',
  billingContactPerson: null,
  billingContactPersonEmail: null,
  projectRequestMilestoneDTO: null,
  platform: '',
  domain: null,
  clientName: null,
  hiveProjectFlag: null,
  allocation: null,
}

const mockEmployeeProject = {
  employeeId: 1076,
  empFirstName: 'Srinivas',
  empLastName: 'Suppala',
  projectName: 'JXT - UI integration',
  projectId: 317,
  startDate: '13/02/2019',
  endDate: '30/06/2019',
  billable: true,
  comments: '',
  department: 'Designing',
  desigination: 'Head, UX',
  userName: 'Srinivas Suppala',
  isAllocated: true,
  duration: null,
  count: null,
  rate: null,
  role: null,
  amount: null,
  empName: null,
  status: null,
  monthWorkingDays: null,
  holidays: null,
  leaves: null,
  totalDays: null,
  hours: null,
  totalValue: null,
  allocation: '100',
}

const mockToAllocatedProject = {
  data: mockEmployeeProject,
  projectId: 317,
  isAllocatedVisible: false,
}

const mockHandleOnChangeAllocation = jest.fn()
const mockGetConditionValue = jest.fn()
const handleOnChangeBillable = jest.fn()
const handleOnChangeIsAllocated = jest.fn()
const handleUpdateProject = jest.fn()
const handleAllocationModal = jest.fn()
const handleShowDeallocationModal = jest.fn()
const handleCancelUpdate = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProjectDetailsTable
      toAllocatedProject={mockToAllocatedProject}
      handleOnChangeAllocation={mockHandleOnChangeAllocation}
      getConditionValue={mockGetConditionValue}
      handleOnChangeBillable={handleOnChangeBillable}
      handleOnChangeIsAllocated={handleOnChangeIsAllocated}
      handleUpdateProject={handleUpdateProject}
      handleAllocationModal={handleAllocationModal}
      handleShowDeallocationModal={handleShowDeallocationModal}
      handleCancelUpdate={handleCancelUpdate}
      allocated={allocated}
      deAllocated={deAllocated}
      value={mockProject}
    />
  </div>
)

describe('Project Report Table Testing with sub table', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
        projectReport: {
          listSize: 28,
          isProjectLoading: ApiLoadingState.succeeded,
          isClientProjectLoading: ApiLoadingState.succeeded,
          ProjectDetails: {
            Projsize: mockProjectReportData.Projsize,
            Projs: mockProjectReportData.Projs,
          },
          Clients: mockProjectReportData.Projs,
          ClientProjects: mockEmployeeProjectsDetail,
        },
      },
    })
  })

  test('Should be able open sub table when clicking plus button', () => {
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Designation')).toBeInTheDocument()
    expect(screen.getByText('Department')).toBeInTheDocument()
    expect(screen.getByText('Allocation')).toBeInTheDocument()
    expect(screen.getByText('Allocated Date')).toBeInTheDocument()
    expect(screen.getByText('Billable')).toBeInTheDocument()
    expect(screen.getByText('Current Status')).toBeInTheDocument()
  })
})
