import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KRALandingScreen from './KRALandingScreen'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockKPISelfDevDevelopmentList,
  mockKRADataList,
} from '../../../test/data/KRAData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { KRAPages } from '../../../types/Performance/KRA/KRATypes'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KRALandingScreen />
  </div>
)

describe('KRA Landing Screen', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kraData: mockKRADataList,
            kpisForIndividualKRAList: mockKPISelfDevDevelopmentList,
            currentOnScreenPage: KRAPages.kraList,
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

    test('heading is shown', () => {
      expect(screen.getByText('KRA List')).toBeVisible()
    })

    test('redirect to add kra page', () => {
      userEvent.click(screen.getByTestId('add-kra-screen-btn'))
    })
  })
})
