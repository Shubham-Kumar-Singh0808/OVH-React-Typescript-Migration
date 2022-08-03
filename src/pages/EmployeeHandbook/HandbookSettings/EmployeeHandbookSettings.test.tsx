import '@testing-library/jest-dom'
import React from 'react'
import EmployeeHandbookSettings from './EmployeeHandbookSettings'
import { render, screen } from '../../../test/testUtils'

describe('Handbook Settings Component Testing', () => {
  test('should render Handbook Settings Component without crashing', () => {
    render(<EmployeeHandbookSettings />)
    expect(screen.getByText('Handbook Settings')).toBeInTheDocument()
  })
})
