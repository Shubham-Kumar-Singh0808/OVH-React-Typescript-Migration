import {
  AddUserRoleType,
  FeaturesUnderRoleType,
  UserRoleSubFeaturesType,
  UserRoleType,
} from '../../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { methods, userRolesConfigurationApi } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const fetchUserRolesApiCall = async (): Promise<
  UserRoleType[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.getUserRoles,
    method: methods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

export const isRoleExitsApiCall = async (
  roleInput: string,
): Promise<boolean | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.isUserRoleExists,
    method: methods.get,
    params: {
      roleName: roleInput,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const addUserRoleApiCall = async ({
  roleInput,
  reportingManagerFlag,
}: AddUserRoleType): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.addNewUserRole,
    method: methods.post,
    params: {
      roleName: roleInput,
      reportingManagerFlag: reportingManagerFlag,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const deleteUserRoleApiCall = async (
  roleId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.deleteUserRole,
    method: methods.post,
    params: {
      roleId: roleId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchSubFeaturesApiCall = async (): Promise<
  UserRoleSubFeaturesType[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.getSubFeatures,
    method: methods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const fetchFeaturesUnderApiCall = async (
  selectedRoleId: string,
): Promise<FeaturesUnderRoleType[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.featuresUnderRole,
    method: methods.get,
    params: {
      roleId: selectedRoleId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
