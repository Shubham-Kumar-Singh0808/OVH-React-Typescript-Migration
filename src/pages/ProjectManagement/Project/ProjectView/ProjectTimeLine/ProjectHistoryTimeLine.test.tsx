import React from 'react'
import '@testing-library/jest-dom'
import ProjectHistoryTimeLine from './ProjectHistoryTimeLine'
import { render, screen } from '../../../../../test/testUtils'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { mockProjectHistoryDetails } from '../../../../../test/data/projectViewTimeLineData'

describe('ProjectHistoryTimeLine Component Testing', () => {
  describe('should render ProjectHistoryTimeLine Component without data', () => {
    beforeEach(() => {
      render(<ProjectHistoryTimeLine />, {
        preloadedState: {
          projectTimeLine: {
            projectHistoryResponse: mockProjectHistoryDetails,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockProjectHistoryDetails.list.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('Thirupathi Chindam')).toBeInTheDocument()
      expect(screen.getByText('24-Dec-2022 02:38:49 PM')).toBeInTheDocument()
      expect(screen.getByText('RETAINER')).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('update-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
    test('should render updated button with data ', () => {
      const createdElement = screen.getAllByTestId('created-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })
  })
})
