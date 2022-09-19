import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import BookingListTable from './BookingListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockBookingsForSelection } from '../../../test/data/bookingListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryAllByText(mockBookingsForSelection[i].fromDate),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <BookingListTable />
  </div>
)

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
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
  test('should render description modal', () => {
    const descriptionElement = screen.getAllByTestId('ticket-agenda-link')
    userEvent.click(descriptionElement[0])
    expect(descriptionElement[0]).toBeInTheDocument()
  })
})
