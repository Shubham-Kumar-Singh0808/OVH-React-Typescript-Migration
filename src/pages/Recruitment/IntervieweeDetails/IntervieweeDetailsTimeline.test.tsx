import React from 'react'
import '@testing-library/jest-dom'
import IntervieweeDetailsTimeline from './IntervieweeDetailsTimeline'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { render, screen } from '../../../test/testUtils'
import {
  timeLineDetails,
  EmpScheduleInterviewData,
} from '../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'
import { mockTimeLineList } from '../../../test/data/IntervieDeatilsData'

describe('Employee Pip Time line Component Testing', () => {
  describe('should render Employee Pip Time line Component without data', () => {
    beforeEach(() => {
      render(<IntervieweeDetailsTimeline />, {
        preloadedState: {
          intervieweeDetails: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            timeLineList: mockTimeLineList,
            cycleDtOs: mockTimeLineList.cycleDTOs,
            CycleDtOsList: [],
            timeLineDetails: {} as timeLineDetails,
            scheduleInterviewData: {} as EmpScheduleInterviewData,
          },
        },
      })
    })

    test('should render with data ', () => {
      expect(screen.getByText('06 Jun 2023')).toBeInTheDocument()
      expect(screen.getByText('1:48 PM')).toBeInTheDocument()
    })
  })
})
