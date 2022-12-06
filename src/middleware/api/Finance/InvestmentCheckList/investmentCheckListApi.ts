import {
  Invest,
  Section,
} from '../../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, InvestmentCheckListApiConfig } from '../../apiList'

const getInvestments = async (sectionId: number): Promise<Invest[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: InvestmentCheckListApiConfig.getInvestments,
    method: AllowedHttpMethods.get,
    params: {
      sectionId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSections = async (): Promise<Section[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: InvestmentCheckListApiConfig.getSections,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const investmentCheckListApi = {
  getInvestments,
  getSections,
}

export default investmentCheckListApi
