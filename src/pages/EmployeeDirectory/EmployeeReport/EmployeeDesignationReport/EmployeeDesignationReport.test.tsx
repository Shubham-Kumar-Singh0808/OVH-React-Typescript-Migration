import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '../../../../test/testUtils'
import EmployeeDesignationReport from './EmployeeDesignationReport'

describe('Employee Designation Report Component Testing', () => {
  test('should render Employee Designation Report component without crashing', async () => {
    render(<EmployeeDesignationReport />)

    expect(
      screen.getByText('Employee Designation List Report'),
    ).toBeInTheDocument()
  })
})
