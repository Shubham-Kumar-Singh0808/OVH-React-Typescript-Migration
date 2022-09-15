import '@testing-library/jest-dom'
import React from 'react'
import AddTrackerListTable from './AddTrackerListTable'
import { render, screen } from '../../../../test/testUtils'

describe('AddTracker List without data', () => {
  beforeEach(() => {
    render(<AddTrackerListTable />)
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Approval' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Tracker" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
