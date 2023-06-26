import React from 'react'
import userEvent from '@testing-library/user-event'
import UserSubFeaturesTable from './UserSubFeaturesTable'
import { cleanup, render, screen, act } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockIncomingSubFeatures,
  mockIncomingUserRolesList,
  mockMappedFeatures,
  mockUserRoleFeatures,
} from '../../../../test/data/userRolesConfigurationData'
import { getUserRolesConfigTestId } from '../UserRolesConfigurationsHelpers'
import { FeatureAccessModifierEnum } from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'

const featureId = 1
const chosenSubFeature = mockMappedFeatures[0]

describe('Sub Features Table', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(
        <UserSubFeaturesTable
          featureItem={chosenSubFeature}
          featureId={featureId}
        />,
        {
          preloadedState: {
            userRolesConfiguration: {
              isLoading: ApiLoadingState.succeeded,
              error: null,
              roles: mockIncomingUserRolesList,
              featuresUnderRole: mockUserRoleFeatures,
              selectedRole: mockIncomingUserRolesList[1],
              subFeatures: mockIncomingSubFeatures,
              mappedFeatures: mockMappedFeatures,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    screen.debug()

    test('column headers are correctly rendered', () => {
      expect(
        screen.getByRole('columnheader', { name: 'Feature Name' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'View' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Create' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Edit' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Delete' })).toBeTruthy()
    })
    test('subFeature name click functionality', () => {
      // content testing in modal functionality is implemented in ChildFeaturesTableModal.test.tsx
      const probationaryEndDateFeatureId = 141
      const targetName = screen.getByTestId(
        getUserRolesConfigTestId(
          `subFeatureName-${probationaryEndDateFeatureId}`,
        ),
      )
      expect(targetName).toHaveTextContent('ProbationaryEndDates')
      act(() => {
        userEvent.click(targetName)
      })
    })
    test('checkboxes correctly rendered', () => {
      // checking for holidays subFeature
      const holidaysFeatureId = 238

      // view checkBtn
      expect(
        screen.queryByTestId(
          getUserRolesConfigTestId(
            `checkBtn-${holidaysFeatureId}-${FeatureAccessModifierEnum.View}`,
          ),
        ),
      ).not.toBeInTheDocument()

      // create checkBtn
      expect(
        screen.queryByTestId(
          getUserRolesConfigTestId(
            `checkBtn-${holidaysFeatureId}-${FeatureAccessModifierEnum.Create}`,
          ),
        ),
      ).toBeInTheDocument()

      // edit checkBtn
      expect(
        screen.queryByTestId(
          getUserRolesConfigTestId(
            `checkBtn-${holidaysFeatureId}-${FeatureAccessModifierEnum.Update}`,
          ),
        ),
      ).toBeInTheDocument()

      // delete checkBtn
      expect(
        screen.queryByTestId(
          getUserRolesConfigTestId(
            `checkBtn-${holidaysFeatureId}-${FeatureAccessModifierEnum.Delete}`,
          ),
        ),
      ).toBeInTheDocument()
    })
  })
})
