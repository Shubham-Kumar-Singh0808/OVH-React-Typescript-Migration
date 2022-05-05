import { personalInfoApi, methods } from '../../apiList'

import {
  FamilyDetailsModal,
  VisaDetailsModal,
} from '../../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
export const fetchFamilyDetailsApiCall = async (
  employeeId: number | string,
): Promise<FamilyDetailsModal[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getFamilyDetails,
    method: methods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const fetchVisaDetailsApiCall = async (
  employeeId: number | string,
): Promise<VisaDetailsModal[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaDetails,
    method: methods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
