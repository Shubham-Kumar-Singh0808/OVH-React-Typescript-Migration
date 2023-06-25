import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import BookingListTable from './BookingListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockBookingsForSelection } from '../../../test/data/bookingListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <BookingListTable />
  </div>
)

describe('Booking List Table Component Testing without data', () => {
  beforeEach(() => {
    render(toRender)
  })
  afterEach(cleanup)
  test('should render the "booking List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  describe('Booking List Table Component Testing', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          bookingList: {
            getBookingsForSelection: mockBookingsForSelection,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render booking list table component with data without crashing', async () => {
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(24)
      })
    })
    test('should render subject modal', () => {
      const subjectElement = screen.getAllByTestId('ticket-agenda-link')
      userEvent.click(subjectElement[0])
      expect(subjectElement[0]).toBeInTheDocument()
    })
    test('should render description modal', () => {
      expect(
        screen.getByText('Total Records: ' + mockBookingsForSelection.length),
      ).toBeInTheDocument()
    })
    test('should render first page data only', async () => {
      await waitFor(() => {
        userEvent.click(screen.getByText('Next ›', { exact: true }))

        expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
        expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
      })
    })
    test('should disable first and prev in pagination if first page', async () => {
      await waitFor(() => {
        expect(screen.getByText('« First')).toHaveAttribute('disabled')
        expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
        expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
        expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
      })
    })
  })
})
