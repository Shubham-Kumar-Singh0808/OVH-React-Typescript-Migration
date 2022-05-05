import { personalInfoApi, methods } from '../../apiList'

import {
  FamilyDetailsModal,
  VisaDetailsModal,
  GetCountryDetailsType,
  VisaCountryDetailsModal,
  VisaDetailsStateModal,
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
export const fetchCountryDetailsApiCall = async (): Promise<
  GetCountryDetailsType | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getCountryDetails,
    method: methods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const fetchVisaCountryDetailsApiCall = async (
  countryId: number | string,
): Promise<VisaCountryDetailsModal[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaTypeDetails,
    method: methods.get,
    params: {
      id: countryId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getAddNewFamilyMemberApiCall = async (
  employeeVisaDetails: VisaDetailsStateModal,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.addNewVisaMember,
    method: methods.post,
    data: employeeVisaDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}
