import {
  BirthDayApiProps,
  UpcomingBirthdayResponse,
} from '../../../types/Dashboard/Birthdays/birthdayTypes'
import { employeeProfileData } from '../../../types/Dashboard/employeeSearchTypes'
import {
  JobOpeningsApiProps,
  JobVacanciesResponse,
} from '../../../types/Dashboard/JobOpenings/JobOpeningsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../utils/apiUtils'
import { AllowedHttpMethods, dashboardApiConfig } from '../apiList'

const getAllJobVacancies = async (
  props: JobOpeningsApiProps,
): Promise<JobVacanciesResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getAllJobVacancies,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      searchJobTitle: props.searchJobTitle ?? '',
      status: props.status ?? 'open',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getUpcomingBirthdayAnniversaries = async (
  props: BirthDayApiProps,
): Promise<UpcomingBirthdayResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getUpcomingBirthdayAnniversaries,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 3,
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getFinancialYear = async (): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.getFinancialYear,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const imageFix = async (): Promise<string | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.imageFix,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const searchEmployee = async (
  searchValue: string,
): Promise<employeeProfileData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: dashboardApiConfig.searchEmployee,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchValue,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const dashboardApi = {
  getAllJobVacancies,
  getUpcomingBirthdayAnniversaries,
  getFinancialYear,
  searchEmployee,
  imageFix,
}

export default dashboardApi
