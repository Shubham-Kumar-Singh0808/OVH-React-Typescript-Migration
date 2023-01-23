import {
  GetActiveCycleData,
  GetAllCycles,
  GetAllQuestions,
  GetQuestion,
  TotalResponse,
} from '../../../../types/Settings/InitiateCycle/initiateCycleTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { initiateCycleApiConfig, AllowedHttpMethods } from '../../apiList'

const getActiveCycleData = async (): Promise<GetActiveCycleData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.getActiveCycleData,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllCycles = async (): Promise<GetAllCycles> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.getallcycles,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllQuestions = async (): Promise<GetAllQuestions> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.getAllQuestions,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const initiateCycle = async (data: TotalResponse): Promise<TotalResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.initiateCycle,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteQuestion = async (questionId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.deleteQuestion,
    method: AllowedHttpMethods.delete,
    params: {
      questionId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addQuestion = async ({
  question,
}: {
  question: string
}): Promise<GetQuestion[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.addQuestion,
    method: AllowedHttpMethods.post,
    data: {
      question,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const initiateCycleApi = {
  getActiveCycleData,
  getAllCycles,
  getAllQuestions,
  initiateCycle,
  deleteQuestion,
  addQuestion,
}

export default initiateCycleApi
