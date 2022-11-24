import React from 'react'
import '@testing-library/jest-dom'
import ResignationTimeLine from './ResignationTimeLine'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockResignationListHistory } from '../../../../test/data/resignationListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ResignationTimeLine />,
  </div>
)

describe('Resignation History Time line Component Testing', () => {
  describe('should render Resignation History Time line Component without data', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          resignationList: {
            separationTimeLine: mockResignationListHistory,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    screen.debug()
    test('should render ', () => {
      mockResignationListHistory.separationComments.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId('sh-time-stamp')
        expect(screen.getByText(childFeature.createdDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('21-Nov-2022 06:31 PM')).toBeInTheDocument()
    })
  })
})
