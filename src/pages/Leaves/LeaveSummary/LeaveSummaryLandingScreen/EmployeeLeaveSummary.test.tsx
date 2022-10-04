import '@testing-library/jest-dom'
import React from 'react'
import EmployeeLeaveSummary from './EmployeeLeaveSummary'
import { render, screen } from '../../../../test/testUtils'

describe('Leave Summary Component Testing', () => {
  test('should render Leave Summary Component without crashing', () => {
    render(<EmployeeLeaveSummary />)
    expect(screen.getByText('Leave Summary')).toBeInTheDocument()
  })
})
