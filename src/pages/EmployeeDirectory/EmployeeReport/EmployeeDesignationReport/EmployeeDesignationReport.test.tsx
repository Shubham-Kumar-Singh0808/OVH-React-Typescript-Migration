import React from 'react'
import '@testing-library/jest-dom'
import EmployeeDesignationReport from './EmployeeDesignationReport'
import { render, screen, waitFor } from '../../../../test/testUtils'

describe('Employee Designation Report Component Testing', () => {
  test('should render Employee Designation Report component without crashing', async () => {
    render(<EmployeeDesignationReport />)

    await waitFor(() => {
      expect(
        screen.getByText('Employee Designation List Report'),
      ).toBeInTheDocument()
    })
  })
})
