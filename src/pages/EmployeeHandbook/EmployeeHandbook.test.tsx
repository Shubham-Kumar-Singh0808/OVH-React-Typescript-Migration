import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import EmployeeHandbook from './EmployeeHandbook'
import React from 'react'

describe('Employee Handbook Component Testing', () => {
  test('should render Employee Handbook Tab component with out crashing', async () => {
    render(<EmployeeHandbook />)

    expect(screen.getByText('Employee Handbook')).toBeInTheDocument()
  })
})
