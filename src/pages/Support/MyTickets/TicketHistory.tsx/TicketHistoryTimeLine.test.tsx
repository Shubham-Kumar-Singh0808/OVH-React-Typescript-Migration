import React from 'react'
import '@testing-library/jest-dom'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { mockTicketListHistoryDetails } from '../../../../test/data/ticketListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Ticket History Time line Component Testing', () => {
  describe('should render Ticket History Time line Component without data', () => {
    beforeEach(() => {
      render(<TicketHistoryTimeLine />, {
        preloadedState: {
          tickets: {
            ticketHistory: mockTicketListHistoryDetails,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockTicketListHistoryDetails.list.forEach((childFeature) => {
        const timeStamp = screen.getByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('pen')).toBeInTheDocument()
      expect(screen.getByText('balu')).toBeInTheDocument()
      expect(screen.getByText('12/03/2021')).toBeInTheDocument()
      expect(screen.getByText('05-Sep-2022 04:35:28 PM')).toBeInTheDocument()
      expect(screen.getByText('12/08/2022')).toBeInTheDocument()
    })
  })
})
