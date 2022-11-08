import '@testing-library/jest-dom'
import React from 'react'
import FeedbackFormsList from './FeedbackFormsList'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockFeedbackFormList } from '../../../../test/data/feedbackFormListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>

    <FeedbackFormsList />
  </div>
)
describe('FeedbackForms List Component Testing', () => {
  render(toRender, {
    preloadedState: {
      eventList: {
        feedbackFormDetails: mockFeedbackFormList.list,
        isLoading: ApiLoadingState.succeeded,
        listSize: mockFeedbackFormList.size,
      },
      authentication: {
        authenticatedUser: {
          employeeName: 'admin',
          employeeId: '1981',
          userName: 'admin',
          role: 'admin',
          tenantKey: 'RAYBIZTECH',
          token: 'test123',
          designation: 'Software Engineer',
        },
      },
    },
  })
  screen.debug()
  test('should render Feedback Forms Page without crashing', () => {
    expect(screen.getByText('Feedback Forms')).toBeInTheDocument()
  })
})
