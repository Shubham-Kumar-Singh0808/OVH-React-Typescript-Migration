import '@testing-library/jest-dom'
import React from 'react'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { mockTicketListHistoryDetails } from '../../../../test/data/ticketListHistoryData'

describe('Ticket History Time line Component Testing', () => {
  describe('should render Ticket History Time line Component without data', () => {
    beforeEach(() => {
      render(<TicketHistoryTimeLine />, {
        preloadedState: {
          tickets: {
            ticketHistory: mockTicketListHistoryDetails,
          },
        },
      })
    })
    expect(screen.getByText('12/03/2021')).toBeInTheDocument()
    expect(screen.getByText('17/05/2022')).toBeInTheDocument()
  })
})
