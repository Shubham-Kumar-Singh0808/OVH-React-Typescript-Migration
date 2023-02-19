import {
  GetActiveCycleData,
  GetAllCycles,
  GetAllQuestions,
  GetQuestion,
  NominationCycle,
  NominationCycleDto,
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

const addCycle = async ({
  activateFlag,
  cycleName,
  endDate,
  fromMonth,
  startDate,
  toMonth,
}: {
  activateFlag: boolean
  cycleName: string | undefined
  endDate: string | undefined
  fromMonth: string | undefined
  startDate: string | undefined
  toMonth: string | undefined
}): Promise<NominationCycle> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.addCycle,
    method: AllowedHttpMethods.post,
    data: {
      activateFlag,
      cycleName,
      endDate,
      fromMonth,
      startDate,
      toMonth,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const editCycle = async (cycleId: number): Promise<NominationCycleDto> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.editCycle,
    method: AllowedHttpMethods.get,
    params: {
      cycleId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateCycle = async (
  updateCycleData: NominationCycleDto,
): Promise<NominationCycleDto> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: initiateCycleApiConfig.updateCycle,
    method: AllowedHttpMethods.put,
    data: updateCycleData,
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
  addCycle,
  editCycle,
  updateCycle,
}

export default initiateCycleApi
