import {
  GetAllJobVacancies,
  GetAllJobVacanciesProps,
  GetAllTechnology,
  JobVacancy,
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

const addJobVacancy = async (): Promise<JobVacancy> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: jobOpeningsApiConfig.addJobVacancy,
    method: AllowedHttpMethods.post,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const jobOpeningsApi = {
  getAllJobVacancies,
  getAllTechnology,
  addJobVacancy,
}

export default jobOpeningsApi
