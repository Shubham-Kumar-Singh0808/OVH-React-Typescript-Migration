import React from 'react'
import '@testing-library/jest-dom'
import EmployeeDesignationReport from './EmployeeDesignationReport'
import { render, screen } from '../../../../test/testUtils'

describe('Employee Designation Report Component Testing', () => {
  // eslint-disable-next-line require-await
  test('should render Employee Designation Report component without crashing', async () => {
    render(<EmployeeDesignationReport />)

    expect(
      screen.getByText('Employee Designation List Report'),
    ).toBeInTheDocument()
  })
})
