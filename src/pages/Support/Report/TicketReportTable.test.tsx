import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketReportTable from './TicketReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockTicketReportData } from '../../../test/data/ticketReportsData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockTicketReportData[i].categoryName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockSetToggle = jest.fn()

describe('Scheduled Candidates Table Component Testing', () => {
  test('should render scheduled candidates table component without crashing', async () => {
    render(
      <TicketReportTable
        setToggle={mockSetToggle}
        selectDate={''}
        toDate={''}
        fromDate={''}
        selectDepartment={''}
      />,
      {
        preloadedState: {
          ticketReport: {
            isLoading: ApiLoadingState.succeeded,
            ticketsReportList: mockTicketReportData,
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(0)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(0)
    })
  })
})

describe('Employee Ticket Details', () => {
  beforeEach(() => {
    render(
      <TicketReportTable
        setToggle={mockSetToggle}
        selectDate={''}
        toDate={''}
        fromDate={''}
        selectDepartment={''}
      />,
      {
        preloadedState: {
          ticketReport: {
            isLoading: ApiLoadingState.succeeded,
            ticketsReportList: mockTicketReportData,
          },
        },
      },
    )
  })
  test('should clicking on number of tickets', () => {
    const linkElement = screen.getAllByTestId('num-tickets')
    expect(linkElement).toBeTruthy()
  })
  test('should when clicking on ticket description link', () => {
    const linkElement = screen.getAllByTestId('pending-tickets')
    expect(linkElement).toBeTruthy()
  })
})
