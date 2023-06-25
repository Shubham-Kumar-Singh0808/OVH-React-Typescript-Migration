import { mapFeaturesToSubFeaturesRoleConfiguration } from './rolesAndPermissionsUtils'
import {
  mockIncomingSubFeatures,
  mockMappedFeatures,
  mockUserRoleFeatures,
} from '../test/data/userRolesConfigurationData'

describe('Roles and Permissions Utils', () => {
  it('returns correct values', () => {
    const finalMappedValues = mapFeaturesToSubFeaturesRoleConfiguration(
      mockUserRoleFeatures,
      mockIncomingSubFeatures,
    )
    expect(finalMappedValues).toEqual(mockMappedFeatures)
  })
})
