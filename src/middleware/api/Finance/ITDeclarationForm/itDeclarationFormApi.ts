import {
  EmployeeDetails,
  Invest,
  Sections,
  submitITDeclarationForm,
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

const getInvestsBySectionId = async (sectionId: number): Promise<Invest[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.getInvestsBySectionId,
    method: AllowedHttpMethods.get,
    params: {
      sectionId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addITDeclarationForm = async (
  submitDeclarationForm: submitITDeclarationForm,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.addITDeclarationForm,
    method: AllowedHttpMethods.post,
    data: submitDeclarationForm,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isITDeclarationFormExist = async (): Promise<boolean | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.isITDeclarationFormExist,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadITDocument = () => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationFormApiConfig.uploadITDocuments,
    method: AllowedHttpMethods.post,
  })
  return useAxios(requestConfig)
}

const itDeclarationFormApi = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
  addITDeclarationForm,
  isITDeclarationFormExist,
  uploadITDocument,
}

export default itDeclarationFormApi
