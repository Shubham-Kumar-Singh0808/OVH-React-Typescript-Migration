import '@testing-library/jest-dom'
import React from 'react'
import TrackerListTable from './TrackerListTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { mockAddTrackerList } from '../../../../test/data/addTrackerListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

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

describe('AddTracker List Table without data', () => {
  beforeEach(() => {
    render(
      <div>
        <div id="backdrop-root"></div>
        <div id="overlay-root"></div>
        <div id="root"></div>
        <TrackerListTable />
      </div>,
      {
        preloadedState: {
          addTrackerLists: {
            isLoading: ApiLoadingState.succeeded,
            trackerList: mockAddTrackerList,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render AddTracker List component with data', () => {
    expect(screen.getByText('Issue')).toBeInTheDocument()
  })
})
