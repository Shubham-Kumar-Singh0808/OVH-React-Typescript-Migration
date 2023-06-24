import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import IntervieweeDetails from './IntervieweeDetails'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { render, screen } from '../../../test/testUtils'
import {
  CycleDtOs,
  timeLineDetails,
  EmpScheduleInterviewData,
} from '../../../types/Recruitment/IntervieweeDetails/IntervieweeDetailsTypes'
import { mockTimeLineList } from '../../../test/data/IntervieDeatilsData'

const mockSetToggle = jest.fn()

describe('Employee Pip Time line Component Testing', () => {
  describe('should render Employee Pip Time line Component without data', () => {
    beforeEach(() => {
      render(<IntervieweeDetails />, {
        preloadedState: {
          intervieweeDetails: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            timeLineList: mockTimeLineList,
            cycleDtOs: {} as CycleDtOs,
            CycleDtOsList: [],
            timeLineDetails: {} as timeLineDetails,
            scheduleInterviewData: {} as EmpScheduleInterviewData,
          },
        },
      })
    })

    test('should be able to render Interviewee Details Title', () => {
      expect(screen.getByText('Interviewee Details')).toBeInTheDocument()
    })
    test('should render click on back button', () => {
      const backButtonElement = screen.getByTestId('back-button')
      expect(backButtonElement).toBeInTheDocument()
      userEvent.click(backButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
    })
    test('should render with data ', () => {
      expect(screen.getByText('NO SHOW')).toBeInTheDocument()
      expect(screen.getByText('SKYPE')).toBeInTheDocument()
      expect(screen.getByText('SDLC ,STLC')).toBeInTheDocument()
      expect(screen.getByText('93849684986934jgfnjgn95898')).toBeInTheDocument()
    })
    test('should render click on schedule button', () => {
      const scheduleButtonElement = screen.getByTestId('schedule-interview')
      expect(scheduleButtonElement).toBeInTheDocument()
      userEvent.click(scheduleButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
    })
    test('should render click on schedule button', () => {
      const rescheduleButtonElement = screen.getByTestId('reschedule-interview')
      expect(rescheduleButtonElement).toBeInTheDocument()
      userEvent.click(rescheduleButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
    })
    test('should render click on edit button', () => {
      const editButtonElement = screen.getByTestId('edit-btn')
      expect(editButtonElement).toBeInTheDocument()
      // userEvent.click(backButtonElement)
      expect(mockSetToggle).toHaveBeenCalledTimes(0)
    })
  })
})
