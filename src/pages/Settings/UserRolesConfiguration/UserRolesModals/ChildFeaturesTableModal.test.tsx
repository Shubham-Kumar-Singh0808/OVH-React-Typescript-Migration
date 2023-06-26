import React from 'react'
import userEvent from '@testing-library/user-event'
import ChildFeaturesTableModal from './ChildFeaturesTableModal'
import {
  mockIncomingUserRolesList,
  mockMappedFeatures,
} from '../../../../test/data/userRolesConfigurationData'
import { act, cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  getUserRolesConfigTestId,
  initialUserRoleConfigurationModal,
} from '../UserRolesConfigurationsHelpers'
import { FeatureAccessModifierEnum } from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'

// choosing probationaryEndDates Child Features
const { childFeatures } = mockMappedFeatures[0].features[4]

describe('Child Features Table Modal', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(<ChildFeaturesTableModal childFeatures={childFeatures} />, {
        preloadedState: {
          userRolesConfiguration: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            roles: mockIncomingUserRolesList,
            configurationModal: {
              ...initialUserRoleConfigurationModal,
              displayModal: true,
            },
            selectedRole: mockIncomingUserRolesList[1],
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('column headers are correctly rendered', () => {
      expect(
        screen.getByRole('columnheader', { name: 'Feature Name' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'View' })).toBeTruthy()
    })
    test('correct number of rows are rendered', () => {
      expect(
        screen.getAllByTestId(getUserRolesConfigTestId('childFeaturesRow')),
      ).toHaveLength(childFeatures.length)
    })
    test('row has rendered correct data and check button functionality', () => {
      const testFeature = 204
      expect(
        screen.getByTestId(
          getUserRolesConfigTestId(`childFeatureName-${testFeature}`),
        ),
      ).toHaveTextContent('Hierarchy ProbationaryEndDates')

      const viewCheck = screen.getByTestId(
        getUserRolesConfigTestId(
          `checkBtn-${testFeature}-${FeatureAccessModifierEnum.View}`,
        ),
      ) as HTMLInputElement
      // checked as from api
      expect(viewCheck.checked).toBe(true)
      act(() => {
        userEvent.click(viewCheck)
      })
    })
  })
})
