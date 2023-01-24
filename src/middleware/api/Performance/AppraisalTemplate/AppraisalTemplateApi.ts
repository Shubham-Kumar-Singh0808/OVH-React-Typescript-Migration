import {
  DesignationsUnderCycleProps,
  GetCycleList,
  DesignationsUnderCycleResponse,
  DesignationWiseKRAsProps,
  GetDesignationWiseKRAs,
  SearchKRAList,
} from '../../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AppraisalTemplateApiConfig, AllowedHttpMethods } from '../../apiList'

const activeCycle = async (): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.activeCycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const cycle = async (): Promise<GetCycleList[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.cycle,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignationsUnderCycle = async (
  props: DesignationsUnderCycleProps,
): Promise<DesignationsUnderCycleResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.getDesignationsUnderCycle,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.cycleId,
      endIndex: props.endIndex,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getDesignationWiseKRAs = async (
  props: DesignationWiseKRAsProps,
): Promise<GetDesignationWiseKRAs> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.getDesignationWiseKRAs,
    method: AllowedHttpMethods.get,
    params: {
      departmentId: props.departmentId,
      designationId: props.designationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const searchKRAList = async ({
  departmentId,
  designationId,
  endIndex,
  multipleSearch,
  startIndex,
}: {
  departmentId: number
  designationId: number
  endIndex: number
  multipleSearch: string
  startIndex: number
}): Promise<SearchKRAList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AppraisalTemplateApiConfig.searchKRAData,
    method: AllowedHttpMethods.post,
    data: {
      departmentId,
      designationId,
      endIndex,
      multipleSearch,
      startIndex,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const AppraisalTemplateApi = {
  activeCycle,
  cycle,
  getDesignationsUnderCycle,
  getDesignationWiseKRAs,
  searchKRAList,
}

export default AppraisalTemplateApi
