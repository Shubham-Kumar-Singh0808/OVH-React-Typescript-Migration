import React from 'react'
import userEvent from '@testing-library/user-event'
import UserFeaturesTable from './UserFeaturesTable'
import {
  getUserRolesConfigTestId,
  initialUserRoleConfigurationModal,
} from './UserRolesConfigurationsHelpers'
import { cleanup, render, screen, act } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockIncomingUserRolesList,
  mockMappedFeatures,
} from '../../../test/data/userRolesConfigurationData'

describe('User Features Table', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(<UserFeaturesTable />, {
        preloadedState: {
          userRolesConfiguration: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            roles: mockIncomingUserRolesList,
            mappedFeatures: mockMappedFeatures,
            selectedRole: mockIncomingUserRolesList[1],
            configurationModal: initialUserRoleConfigurationModal,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('correct number of features are shown', () => {
      expect(
        screen.getAllByTestId(getUserRolesConfigTestId('featureBody')),
      ).toHaveLength(mockMappedFeatures.length)
    })
    test('feature click - subFeatures Open Functionality', () => {
      const indexVal = 0
      const dashboardFeatureName = screen.getByTestId(
        getUserRolesConfigTestId(`featureName-${indexVal}`),
      )
      expect(dashboardFeatureName).toHaveTextContent(
        mockMappedFeatures[indexVal].name,
      )
      act(() => {
        userEvent.click(dashboardFeatureName)
      })
      expect(
        screen.getAllByTestId(
          getUserRolesConfigTestId(
            `subFeatureItems-${mockMappedFeatures[indexVal].id}`,
          ),
        ),
      ).toHaveLength(mockMappedFeatures[indexVal].features.length)
    })
  })
})
