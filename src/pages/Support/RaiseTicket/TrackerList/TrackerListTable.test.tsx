import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TrackerListTable from './TrackerListTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
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

describe('Add Tracker List Table with data', () => {
  beforeEach(() => {
    render(<TrackerListTable />, {
      preloadedState: {
        addTrackerLists: {
          trackerList: mockAddTrackerList,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render Add Tracker List component with data', () => {
    expect(screen.getByText('Issue')).toBeInTheDocument()
    expect(screen.getByText('New Request')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('abc')).toBeInTheDocument()
  })

  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-delete3')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockAddTrackerList.length),
    ).toBeInTheDocument()
  })
})
