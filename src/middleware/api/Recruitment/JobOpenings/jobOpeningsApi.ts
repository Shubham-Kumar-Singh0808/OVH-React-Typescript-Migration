import {
  GetAllJobVacancies,
  GetAllJobVacanciesList,
  GetAllJobVacanciesProps,
  GetAllTechnology,
  JobVacancy,
  JobVacancyAudit,
} from '../../../../types/Recruitment/JobOpenings/jobOpeningsTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, jobOpeningsApiConfig } from '../../apiList'

const getAllJobVacancies = async (
  props: GetAllJobVacanciesProps,
): Promise<GetAllJobVacancies> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.getAllJobVacancies,
    method: AllowedHttpMethods.get,
    params: {
      searchJobTitle: props.searchJobTitle,
      endIndex: props.endIndex,
      startIndex: props.startIndex,
      status: props.status,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.getAllTechnology,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addJobVacancy = async (data: JobVacancy): Promise<JobVacancy> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.addJobVacancy,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteJobVacancy = async (jobvacancyId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.deleteJobVacancy,
    method: AllowedHttpMethods.post,
    params: {
      jobvacancyId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getJobOpeningById = async (
  jobVacancyId: number,
): Promise<GetAllJobVacanciesList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.getJobOpeningById,
    method: AllowedHttpMethods.get,
    params: {
      jobVacancyId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getJobVacancyAudit = async (
  jobvacancyId: number,
): Promise<JobVacancyAudit> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.getJobVacancyAudit,
    method: AllowedHttpMethods.get,
    params: {
      jobvacancyId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const jobOpeningsApi = {
  getAllJobVacancies,
  getAllTechnology,
  addJobVacancy,
  deleteJobVacancy,
  getJobOpeningById,
  getJobVacancyAudit,
}

export default jobOpeningsApi
