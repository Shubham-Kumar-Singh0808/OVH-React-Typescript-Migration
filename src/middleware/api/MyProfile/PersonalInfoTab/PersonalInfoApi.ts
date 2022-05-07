import { personalInfoApi, methods } from '../../apiList'

import {
  FamilyDetailsModal,
  VisaDetailsModal,
  GetCountryDetailsType,
  VisaCountryDetailsModal,
  EmployeeVisaDetails,
  EditFamilyDetailsStateModal,
  EmployeeFamilyDetails,
  EditVisaDetailsStateModal,
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
  employeeVisaDetails: EmployeeVisaDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.addNewVisaMember,
    method: methods.post,
    data: employeeVisaDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getFamilyInformationByFamilyIdApiCall = async (
  familyId: number,
): Promise<EditFamilyDetailsStateModal> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getFamilyInformation,
    method: methods.get,
    params: {
      familyId: familyId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getUpdateNewFamilyMemberApiCall = async (
  employeeFamily: EmployeeFamilyDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.updateFamilyInformation,
    method: methods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getAddNewFamilyMember = async (
  employeeFamily: EmployeeFamilyDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.addNewFamilyMember,
    method: methods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getVisaInformationByVisaIdApiCall = async (
  id: number,
): Promise<EditVisaDetailsStateModal> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaInformation,
    method: methods.get,
    params: {
      id: id,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
