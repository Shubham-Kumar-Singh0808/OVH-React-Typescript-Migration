import '@testing-library/jest-dom'
import React from 'react'
import EmployeeApplyLeave from './EmployeeApplyLeave'
import { render, screen } from '../../../test/testUtils'

describe('Employee Apply Leave Component Testing', () => {
  test('should render Apply Leave component with out crashing', () => {
    render(<EmployeeApplyLeave />)

    expect(screen.getByText('Apply For Leave')).toBeInTheDocument()
  })
})
