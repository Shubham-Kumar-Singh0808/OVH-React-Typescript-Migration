import React from 'react'
import '@testing-library/jest-dom'
import MileStoneTimeLine from './MileStoneTimeLine'
import { render, screen } from '../../../../../../test/testUtils'

describe('Ticket History Time line Component Testing', () => {
  describe('should render Ticket History Time line Component without data', () => {
    beforeEach(() => {
      render(<MileStoneTimeLine />, {
        preloadedState: {
          projectMileStone: {
            ticketHistory: mockTicketListHistoryDetails,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockTicketListHistoryDetails.list.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('pen')).toBeInTheDocument()
      expect(screen.getByText('12/03/2021')).toBeInTheDocument()
      expect(screen.getByText('05-Sep-2022 04:35:28 PM')).toBeInTheDocument()
      expect(screen.getByText('12/08/2022')).toBeInTheDocument()
      expect(screen.getByText('Cancelled')).toBeInTheDocument()
      expect(screen.getByText('Rejected')).toBeInTheDocument()
    })
    test('should render created button with data ', () => {
      const createdElement = screen.getAllByTestId('created-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('update-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
  })
})
