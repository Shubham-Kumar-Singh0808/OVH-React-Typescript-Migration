import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import TicketReportTable from './TicketReportTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import {
  mockTicketDetailsData,
  mockTicketReportData,
} from '../../../test/data/ticketReportsData'
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

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <TicketReportTable
      setToggle={mockSetToggle}
      selectDate={''}
      toDate={''}
      fromDate={''}
      selectDepartment={''}
    />
    ,
  </div>
)

describe('Ticket Report Table Component Testing', () => {
  test('should render Ticket Report table component without crashing', async () => {
    render(toRender, {
      preloadedState: {
        ticketReport: {
          isLoading: ApiLoadingState.succeeded,
          ticketsReportList: mockTicketReportData,
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

describe('Employee Ticket Details', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ticketReport: {
          isLoading: ApiLoadingState.succeeded,
          ticketsReportList: mockTicketReportData,
        },
      },
    })
  })
  test('should clicking on number of tickets', () => {
    const ticketElement = screen.getAllByTestId('num-tickets')
    userEvent.click(ticketElement[0])
    expect(ticketElement).toBeTruthy()
  })
  test('should when clicking on ticket description link', () => {
    const descriptionElement = screen.getAllByTestId('pending-tickets')
    userEvent.click(descriptionElement[0])
    expect(descriptionElement).toBeTruthy()
  })
  test('should when clicking on Closed ticket link', () => {
    const numClosedTicketElement = screen.getAllByTestId('close-tickets')
    userEvent.click(numClosedTicketElement[0])
    expect(numClosedTicketElement).toBeTruthy()
  })
})
