import React from 'react'
import CustomDateFilterOption from './CustomDateFilterOption'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../../test/testUtils'
import { initialStatusReportFilters } from '../../../../reducers/Recruitment/InterviewStatusReport/InterviewStatusReportSliceConstants'

describe('Custom Date Filter Options - Interview Status Report', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(<CustomDateFilterOption />, {
        preloadedState: {
          interviewStatusReport: {
            filterOptions: initialStatusReportFilters,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('to date must be greater than from date error', () => {
      const dates = screen.getAllByPlaceholderText('dd/mm/yyyy')
      act(() => {
        fireEvent.change(dates[0], { target: { value: '06/06/2023' } })
      })
      act(() => {
        fireEvent.change(dates[1], { target: { value: '04/05/2023' } })
      })
      // after the error is shown
      expect(dates[0]).toHaveValue('')
      expect(dates[1]).toHaveValue('')
    })
  })
})
