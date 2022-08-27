import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketDetailsTable from './TicketDetailsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockTicketDetailsData } from '../../../test/data/ticketReportsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockTicketDetailsData[i].employeeName),
    ).toBeInTheDocument()
  }
}

const mockBackButton = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Ticket Details Table Component Testing', () => {
  test('should render Ticket Details table component without crashing', async () => {
    render(<TicketDetailsTable backButtonHandler={mockBackButton} />, {
      preloadedState: {
        ticketReport: {
          ticketsDetailsList: mockTicketDetailsData,
        },
      },
    })

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})
