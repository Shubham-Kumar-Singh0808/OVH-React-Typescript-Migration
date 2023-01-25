import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TrackerListTable from './TrackerListTable'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { mockTrackerList } from '../../../../test/data/ticketApprovalsData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Add Tracker List without data', () => {
  beforeEach(() => {
    render(<TrackerListTable userDeleteAccess={true} />)
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

describe('Add Tracker List Table without data', () => {
  beforeEach(() => {
    render(<TrackerListTable userDeleteAccess={true} />, {
      preloadedState: {
        ticketApprovals: {
          trackerList: mockTrackerList,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render with data ', () => {
    expect(screen.getByText('Issue')).toBeInTheDocument()
    expect(screen.getByText('New Request')).toBeInTheDocument()
    expect(screen.getByText('Testing')).toBeInTheDocument()
    expect(screen.getByText('test22')).toBeInTheDocument()
    expect(screen.getByText('testing12')).toBeInTheDocument()
  })
  test('should be able to click delete button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-delete1')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockTrackerList.length),
    ).toBeInTheDocument()
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
})
