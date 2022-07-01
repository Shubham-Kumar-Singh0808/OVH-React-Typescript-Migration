import '@testing-library/jest-dom'
// import { render, screen } from '@testing-library/react'
import React from 'react'
import EmployeeHandbook from './EmployeeHandbook'
import { render, screen } from '../../test/testUtils'

describe('Employee Handbook Component Testing', () => {
  test('should render Employee Handbook Tab component with out crashing', () => {
    render(<EmployeeHandbook />)

    expect(screen.getByText('Employee Handbook')).toBeInTheDocument()
  })
})
