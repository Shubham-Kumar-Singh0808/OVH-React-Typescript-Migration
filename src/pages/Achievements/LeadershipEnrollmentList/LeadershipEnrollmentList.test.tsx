import '@testing-library/jest-dom'

import React from 'react'
import LeadershipEnrollmentList from './LeadershipEnrollmentList'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockLeadershipDetails } from '../../../test/data/LeadershipEnrollmentListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeadershipEnrollmentList />
  </div>
)

describe('Leadership Enrollment List', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentList: {
            isLoading: ApiLoadingState.succeeded,
            leadershipList: mockLeadershipDetails,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('main heading is rendered', () => {
      expect(screen.getByText('Leadership List')).toBeVisible()
    })
  })
})
