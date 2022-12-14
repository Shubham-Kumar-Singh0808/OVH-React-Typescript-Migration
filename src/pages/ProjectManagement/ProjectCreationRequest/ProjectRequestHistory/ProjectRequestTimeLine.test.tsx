import React from 'react'
import '@testing-library/jest-dom'
import ProjectRequestTimeLine from './ProjectRequestTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockProjectRequestHistory } from '../../../../test/data/projectCreationRequestData'

describe('ProjectRequestTimeLine Component Testing', () => {
  describe('should render ProjectRequestTimeLine Component without data', () => {
    beforeEach(() => {
      render(<ProjectRequestTimeLine />, {
        preloadedState: {
          projectCreationRequest: {
            projectRequestHistoryDetails: mockProjectRequestHistory,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()

    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('11-Sep-2017 02:24:03 PM')).toBeInTheDocument()
      expect(screen.getByText('CREATED')).toBeInTheDocument()
    })
  })
})
