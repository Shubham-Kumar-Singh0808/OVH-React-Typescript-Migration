import React from 'react'
import '@testing-library/jest-dom'
import TicketHistoryTimeLine from './TicketHistoryTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockTicketHistoryData } from '../../../../test/data/ticketConfigurationData'

describe('Ticket History Time line Component Testing', () => {
  describe('should render Ticket History Time line Component without data', () => {
    beforeEach(() => {
      render(<TicketHistoryTimeLine />, {
        preloadedState: {
          ticketConfiguration: {
            ticketHistoryDetails: mockTicketHistoryData,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ticketHistory', () => {
      mockTicketHistoryData.list.forEach((ticketHistory) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(ticketHistory.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render ticketHistory with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('Dinesh Kota -')).toBeInTheDocument()
      expect(screen.getByText('30-Sep-2016 10:24:46 AM')).toBeInTheDocument()
      expect(screen.getByText('Created')).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('th-created-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
  })
})
