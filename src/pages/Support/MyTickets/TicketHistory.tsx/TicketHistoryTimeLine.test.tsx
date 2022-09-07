import '@testing-library/jest-dom'
import React from 'react'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { mockTicketListHistoryDetails } from '../../../../test/data/ticketListData'

describe('Ticket History Time line Component Testing', () => {
  describe('should render Ticket History Time line Component without data', () => {
    beforeEach(() => {
      render(<TicketHistoryTimeLine />, {
        preloadedState: {
          tickets: {
            myTickets: mockTicketListHistoryDetails,
          },
        },
      })
    })
    mockTicketListHistoryDetails.list.forEach((childFeature) => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(
        screen.getByText(childFeature.modifiedDate as string),
      ).toBeInTheDocument()
      expect(timeStamp).toHaveLength(mockTicketListHistoryDetails.list.length)
    })
  })
})
