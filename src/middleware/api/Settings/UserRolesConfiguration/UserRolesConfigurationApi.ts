import {
  IncomingUserRole,
  DefaultUserRoleFeature,
  UserRoleSubFeature,
  OutgoingAssignPermissionDto,
  OutgoingAddRoleDto,
} from '../../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import {
  userRolesConfigurationApiConfig,
  AllowedHttpMethods,
} from '../../apiList'

const getUserRoles = async (): Promise<IncomingUserRole[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.getUserRoles,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getUserFeaturesUnderRole = async (
  selectedRoleId: string,
): Promise<DefaultUserRoleFeature[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.featuresUnderRole,
    method: AllowedHttpMethods.get,
    params: {
      roleId: selectedRoleId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getUserRoleSubFeatures = async (): Promise<UserRoleSubFeature[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.getSubFeatures,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateAssignPermissions = async (
  prepareObject: OutgoingAssignPermissionDto,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.assignPermission,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteUserRole = async (roleId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.deleteUserRole,
    method: AllowedHttpMethods.post,
    params: {
      roleId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isRoleExists = async (roleName: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.isUserRoleExists,
    method: AllowedHttpMethods.get,
    params: {
      roleName,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addRole = async (finalParams: OutgoingAddRoleDto): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.createUserRole,
    method: AllowedHttpMethods.post,
    params: {
      ...finalParams,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const userRolesConfigurationsApi = {
  getUserRoles,
  getUserFeaturesUnderRole,
  getUserRoleSubFeatures,
  updateAssignPermissions,
  deleteUserRole,
  isRoleExists,
  addRole,
}

export default userRolesConfigurationsApi
