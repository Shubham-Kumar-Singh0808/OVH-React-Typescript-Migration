import '@testing-library/jest-dom'
import React from 'react'
import EmployeeDetails from './EmployeeDetails'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeInformation } from '../../../test/data/itDeclarationFormData'

describe('Employee Details Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeDetails />, {
      preloadedState: {
        itDeclarationForm: {
          isLoading: ApiLoadingState.succeeded,
          employeeDetails: mockEmployeeInformation,
        },
      },
    })
  })
  test('should render EmployeeId', () => {
    expect(screen.getByText('Employee Id:')).toBeInTheDocument()
    expect(screen.getByText('1978')).toBeInTheDocument()
  })
  test('should render Employee Name', () => {
    expect(screen.getByText('Employee Name:')).toBeInTheDocument()
    expect(screen.getByText('Mohd Basheer')).toBeInTheDocument()
  })
  test('should render Employee PAN Number', () => {
    expect(screen.getByText('PAN:')).toBeInTheDocument()
    expect(screen.getByText('89e79879845')).toBeInTheDocument()
  })
  test('should render Employee Designation', () => {
    expect(screen.getByText('Designation:')).toBeInTheDocument()
    expect(screen.getByText('Team Lead')).toBeInTheDocument()
  })
})
