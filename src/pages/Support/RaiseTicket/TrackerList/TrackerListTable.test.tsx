import '@testing-library/jest-dom'
import React from 'react'
import TrackerListTable from './TrackerListTable'
import { render, screen } from '../../../../test/testUtils'
import { mockAddTrackerList } from '../../../../test/data/addTrackerListData'

describe('AddTracker List without data', () => {
  beforeEach(() => {
    render(<TrackerListTable />)
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

describe('MyTickets component with data', () => {
  beforeEach(() => {
    render(<TrackerListTable />, {
      preloadedState: {
        addTrackerLists: {
          trackerList: mockAddTrackerList,
        },
      },
    })
  })
  test('should render with data', () => {
    expect(screen.getByText('Issue')).toBeInTheDocument()
    expect(screen.getByText('New Request')).toBeInTheDocument()
    expect(screen.getByText('Teset')).toBeInTheDocument()
  })
})
