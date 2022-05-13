import { personalInfoApi, AllowedHttpMethods } from '../../apiList'

import {
  FamilyDetails,
  VisaDetails,
  GetCountryDetails,
  VisaCountryDetails,
  EmployeeVisaDetails,
  EditFamilyDetailsState,
  EmployeeFamilyDetails,
  EditVisaDetailsState,
} from '../../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
export const getFamilyDetailsApiCall = async (
  employeeId: number | string,
): Promise<FamilyDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getFamilyDetails,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getAddNewFamilyMemberApiCall = async (
  employeeFamily: EmployeeFamilyDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.addNewFamilyMember,
    method: AllowedHttpMethods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getFamilyInformationByFamilyIdApiCall = async (
  familyId: number,
): Promise<EditFamilyDetailsState> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getFamilyInformation,
    method: AllowedHttpMethods.get,
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
    method: AllowedHttpMethods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getDeleteNewFamilyMemberApiCall = async (
  familyId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.deleteFamilyMember,
    method: AllowedHttpMethods.get,
    params: {
      familyId: familyId,
    },
    data: {
      familyId: familyId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getVisaDetailsApiCall = async (
  employeeId: number | string,
): Promise<VisaDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaDetails,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getCountryDetailsApiCall = async (): Promise<
  GetCountryDetails | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getCountryDetails,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const fetchVisaCountryDetailsApiCall = async (
  countryId: number | string,
): Promise<VisaCountryDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaTypeDetails,
    method: AllowedHttpMethods.get,
    params: {
      id: countryId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getAddNewVisaMemberApiCall = async (
  employeeVisaDetails: EmployeeVisaDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.addNewVisaMember,
    method: AllowedHttpMethods.post,
    data: employeeVisaDetails,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}
export const getVisaInformationByVisaIdApiCall = async (
  id: number,
): Promise<EditVisaDetailsState> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getVisaInformation,
    method: AllowedHttpMethods.get,
    params: {
      id: id,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getUpdateNewVisaMemberApiCall = async (
  employeeVisaDetails: EmployeeVisaDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.updateVisaInformation,
    method: AllowedHttpMethods.put,
    data: employeeVisaDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}
export const getDeleteVisaDetailsApiCall = async (
  visaId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.deleteVisaDetail,
    method: AllowedHttpMethods.get,
    params: {
      visaID: visaId,
    },
    data: {
      visaID: visaId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
