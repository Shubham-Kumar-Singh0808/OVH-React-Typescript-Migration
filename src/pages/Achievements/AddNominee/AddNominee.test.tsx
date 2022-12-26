import '@testing-library/jest-dom'

import React from 'react'
import AddNominee from './AddNominee'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAchievementTypeList } from '../../../test/data/AchieverListData'
import { mockNominationFormDetails } from '../../../test/data/AddNomineeData'
import { mockActiveEmployeeList } from '../../../test/data/AddAchieverData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddNominee />
  </div>
)

describe('add nominee', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            isLoading: ApiLoadingState.succeeded,
            achievementTypeList: mockAchievementTypeList,
          },
          addAchiever: {
            isLoading: ApiLoadingState.succeeded,
            activeEmployeeList: mockActiveEmployeeList,
          },
          addNominee: {
            isLoading: ApiLoadingState.succeeded,
            nominationFormDetails: mockNominationFormDetails,
            questionsInformation: [],
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('Heading is there', () => {
      expect(screen.getByText('Add Nominee')).toBeVisible()
    })
  })
})
