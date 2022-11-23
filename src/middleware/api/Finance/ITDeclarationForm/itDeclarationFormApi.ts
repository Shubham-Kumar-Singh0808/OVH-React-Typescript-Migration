import {
  EmployeeDetails,
  Invest,
  Sections,
} from '../../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, itDeclarationFormApiConfig } from '../../apiList'

const getEmployeeInfo = async (): Promise<EmployeeDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.getEmployeeInfo,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getSectionsHavingInvests = async (): Promise<Sections[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.getSectionsHavingInvests,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInvestsBySectionId = async (
  investmentId: number,
): Promise<Invest[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.getInvestsBySectionId,
    method: AllowedHttpMethods.get,
    params: {
      investmentId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const itDeclarationFormApi = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
}

export default itDeclarationFormApi
