import React from 'react'
import { cleanup, screen, render } from '@testing-library/react'
import ITEmployeeDetails from './ITEmployeeDetails'
import { mockUpdateITFormEmployeeInformation } from '../../../../test/data/itDeclarationListData'

describe('IT Employee Details Component', () => {
  beforeEach(() => {
    render(
      <ITEmployeeDetails
        employeeInformation={mockUpdateITFormEmployeeInformation}
      />,
    )
  })
  afterEach(cleanup)
  screen.debug()

  test('should render Employee details', () => {
    // employee Id
    expect(screen.getByText('Employee Id:')).toBeInTheDocument()
    expect(
      screen.getByText(
        mockUpdateITFormEmployeeInformation.employeeId.toString(),
      ),
    ).toBeInTheDocument()

    // employee Name
    expect(screen.getByText('Employee Name:')).toBeInTheDocument()
    expect(
      screen.getByText(mockUpdateITFormEmployeeInformation.fullName),
    ).toBeInTheDocument()

    //pan number
    expect(screen.getByText('PAN:')).toBeInTheDocument()
    expect(
      screen.getByText(
        mockUpdateITFormEmployeeInformation.pan
          ? mockUpdateITFormEmployeeInformation.pan
          : '',
      ),
    ).toBeInTheDocument()

    //designation
    expect(screen.getByText('Designation:')).toBeInTheDocument()
    expect(
      screen.getByText(mockUpdateITFormEmployeeInformation.designation),
    ).toBeInTheDocument()
  })
})
