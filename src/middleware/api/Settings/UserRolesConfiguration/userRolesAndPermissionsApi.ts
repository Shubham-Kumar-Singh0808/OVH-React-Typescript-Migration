import {
  AddUserRole,
  FeaturesUnderRole,
  UserRole,
  UserRoleSubFeatures,
  UtilsRenderPermissionSwitchReturn,
} from '../../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { methods, userRolesConfigurationApi } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

export const getUserRoles = async (): Promise<UserRole[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.getUserRoles,
    method: methods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

export const checkIsRoleExits = async (
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

export const createUserRole = async ({
  roleInput,
  reportingManagerFlag,
}: AddUserRole): Promise<number | undefined> => {
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

export const deleteUserRole = async (
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

export const getUserRoleSubFeatures = async (): Promise<
  UserRoleSubFeatures[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.getSubFeatures,
    method: methods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

export const getUserFeaturesUnderRole = async (
  selectedRoleId: string,
): Promise<FeaturesUnderRole[] | undefined> => {
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
export const updateAssignPermissions = async (
  prepareObject: UtilsRenderPermissionSwitchReturn,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApi.assignPermission,
    method: methods.post,
    data: prepareObject,
  })
  const response = await axios(requestConfig)
  return response.data
}
