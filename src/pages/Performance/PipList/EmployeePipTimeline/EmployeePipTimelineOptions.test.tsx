import React from 'react'
import '@testing-library/jest-dom'
import EmployeePipTimelineOptions from './EmployeePipTimelineOptions'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { render, screen } from '../../../../test/testUtils'
import { mockPipHistoryTimeline } from '../../../../test/data/pipListData'

const testId = 'sh-time-stamp'
describe('Employee Pip Time line Component Testing', () => {
  describe('should render Employee Pip Time line Component without data', () => {
    beforeEach(() => {
      render(<EmployeePipTimelineOptions />, {
        preloadedState: {
          pipList: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            listSize: 1,
            employeePIPTimeline: mockPipHistoryTimeline,
          },
        },
      })
    })
    test('should render ', () => {
      mockPipHistoryTimeline.list.forEach((childFeature) => {
        const timeStamp = screen.getAllByTestId(testId)
        expect(screen.getByText(childFeature.modifiedDate)).toBeInTheDocument()
        expect(timeStamp).toBeTruthy()
      })
    })
    test('should render created button with data ', () => {
      const createdElement = screen.getAllByTestId('created-btn')
      expect(createdElement[0]).toBeInTheDocument()
    })

    test('should render with data ', () => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(timeStamp).toBeTruthy()
      expect(screen.getByText('12 Jan 2023')).toBeInTheDocument()
      expect(screen.getByText('12-Jan-2023 07:47:27 PM')).toBeInTheDocument()
      expect(screen.getByText('19 Jan 2023')).toBeInTheDocument()
      expect(screen.getByText('Created')).toBeInTheDocument()
    })
  })
})
