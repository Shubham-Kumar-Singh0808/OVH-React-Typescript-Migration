import '@testing-library/jest-dom'
import React from 'react'
import EmployeeProjectsTable from './EmployeeProjectsTable'
import { render, screen } from '../../../test/testUtils'

describe('Employee Projects Table Testing', () => {
  beforeEach(() => {
    render(<EmployeeProjectsTable />)
  })
  it('should render the "Projects Table"', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  it('should show the correct headers', () => {
    expect(
      screen.getByRole('columnheader', { name: 'Project Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Client' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Project Manager' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Start Date' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'End Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
  })
})
