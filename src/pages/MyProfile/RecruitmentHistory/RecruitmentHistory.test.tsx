import React from 'react'
import userEvent from '@testing-library/user-event'
import RecruitmentHistory from './RecruitmentHistory'
import { cleanup, render, screen, act } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockIncomingRecruitmentHistoryData } from '../../../test/data/recruitmentHistoryData'

const toRender = <RecruitmentHistory />

const mockRecruitHistoryData = mockIncomingRecruitmentHistoryData

describe('Recruitment History Testing', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          recruitmentHistory: {
            isLoading: ApiLoadingState.succeeded,
            recruitmentHistoryData: mockRecruitHistoryData,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('heading is rendered', () => {
      expect(screen.getByText('History')).toBeVisible()
    })
    test('all cards are rendered', () => {
      expect(screen.getAllByTestId('recruitHistory-timelineCard')).toHaveLength(
        mockRecruitHistoryData.cycleDTOs.length,
      )
    })
    test('testing the first rendered card', () => {
      const testCard = mockRecruitHistoryData.cycleDTOs[0]
      // the interviewer name is rendered correctly
      expect(screen.getByTestId(`recruitHis-interviewer-0`)).toHaveTextContent(
        `${testCard.interviewers} -`,
      )
      // interview comments are rendered
      expect(
        screen.getByTestId(`recruitHis-interviewComm-0`),
      ).toHaveTextContent(testCard.interviewComments)
    })
    test('resume preview button enabled', () => {
      const button = screen.getByTestId('recruitHis-prevBtn')
      expect(button).toBeEnabled()
      act(() => {
        userEvent.click(button)
      })
    })
  })

  describe('empty incoming', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          recruitmentHistory: {
            isLoading: ApiLoadingState.succeeded,
            recruitmentHistoryData: undefined,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('no records found shown', () => {
      expect(screen.getByText('No Records Found...')).toBeVisible()
    })
  })
})
