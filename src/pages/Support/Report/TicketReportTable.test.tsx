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

describe('Scheduled Candidates Table Component Testing', () => {
  test('should render scheduled candidates table component without crashing', async () => {
    render(<TicketReportTable />, {
      preloadedState: {
        ticketReport: {
          isLoading: ApiLoadingState.succeeded,
          ticketsReportList: mockTicketReportData,
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
