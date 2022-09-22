import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAllocationEntryTable from './EmployeeAllocationEntryTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
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

describe('Ticket Approvals Table Component Testing', () => {
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
  test('should render number of records', () => {
    expect(screen.getByText('ovh')).toBeInTheDocument()
    expect(screen.getByText('Mamatha Thunam')).toBeInTheDocument()
    expect(screen.getByText('New')).toBeInTheDocument()
    expect(screen.getByText('29/08/2022')).toBeInTheDocument()
    expect(screen.getByText('05/09/2022')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
    expect(screen.getByText('Allocated')).toBeInTheDocument()
  })
})
