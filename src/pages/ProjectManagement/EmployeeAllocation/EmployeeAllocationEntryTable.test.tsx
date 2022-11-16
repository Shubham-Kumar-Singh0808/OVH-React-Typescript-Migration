import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAllocationEntryTable from './EmployeeAllocationEntryTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockProjectUnderEmployeesList } from '../../../test/data/employeeAllocationReportData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAllocationEntryTable
      id={0}
      Select={''}
      toDate={''}
      allocationStatus={''}
      billingStatus={''}
      fromDate={''}
    />
  </div>
)

describe('Employee Allocation Entry Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        employeeAllocationReport: {
          projectUnderEmployees: mockProjectUnderEmployeesList,
        },
      },
    })
  })

  afterEach(cleanup)
  test('should render table with data', () => {
    expect(screen.getByText('ovh')).toBeInTheDocument()
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('In Progress')).toBeInTheDocument()
    expect(screen.getByText('Closed')).toBeInTheDocument()
  })
  test('should render Project details table component with data', () => {
    mockProjectUnderEmployeesList.forEach((project) => {
      expect(screen.getByText(project.projectName)).toBeInTheDocument()
    })
  })
  test('should render with number of records  ', () => {
    expect(screen.getByText('No Records Found...')).toBeInTheDocument()
  })
})
