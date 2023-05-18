import {
  Invest,
  Section,
} from '../../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'
import {
  AddInvestmentData,
  AddSection,
  Cycle,
  EditITDeclarationEmployeeDetails,
  FinalUpdateITFormDTO,
  Investment,
  ITDeclarationFormListResponse,
  ITDeclarationListApiProps,
  UpdateSection,
} from '../../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, itDeclarationListApiConfig } from '../../apiList'

const getCycles = async (): Promise<Cycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getCycles,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getITDeclarationForm = async (
  props: ITDeclarationListApiProps,
): Promise<ITDeclarationFormListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getITDeclarationForm,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      endIndex: props.endIndex ?? 20,
      employeeName: props.employeeName ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportITDeclarationList = async (
  props: ITDeclarationListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.exportITDeclarationList,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.investmentCycle ?? '',
      searchname: props.searchname ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addCycle = async (addNewCycle: Cycle): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addCycle,
    method: AllowedHttpMethods.post,
    data: addNewCycle,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSections = async (): Promise<Section[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getSections,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addSection = async (
  addNewSection: AddSection,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addSection,
    method: AllowedHttpMethods.post,
    data: addNewSection,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updateSection = async (
  editSection: UpdateSection,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.updateSection,
    method: AllowedHttpMethods.put,
    data: editSection,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteSection = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.deleteSection,
    method: AllowedHttpMethods.delete,
    params: {
      sectionId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInvestments = async (): Promise<Invest[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getInvestments,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addInvestment = async (
  addInvestmentData: AddInvestmentData,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.addInvestment,
    method: AllowedHttpMethods.post,
    data: addInvestmentData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteInvestment = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.deleteInvestment,
    method: AllowedHttpMethods.delete,
    params: {
      investmentId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteCycle = async (id: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.deleteCycle,
    method: AllowedHttpMethods.delete,
    params: {
      cycleId: id,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isSectionExist = async (props: {
  sectionId: number
  sectionName: string
}): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.isSectionExist,
    method: AllowedHttpMethods.get,
    params: {
      sectionId: props.sectionId,
      sectionName: props.sectionName,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const isCycleExist = async (props: {
  cycleId: number
  cycleName: string
}): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.isCycleExist,
    method: AllowedHttpMethods.get,
    params: {
      cycleId: props.cycleId,
      cycleName: props.cycleName,
    },
  })

  const responseVisa = await useAxios(requestConfig)
  return responseVisa.data
}

const updateInvestment = async (
  editInvestment: Investment,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.updateInvestment,
    method: AllowedHttpMethods.put,
    data: editInvestment,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isInvestmentExist = async (props: {
  investmentId: number
  investmentName: string
  sectionId: number
}): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.isInvestmentExist,
    method: AllowedHttpMethods.get,
    params: {
      investmentId: props.investmentId,
      investmentName: props.investmentName,
      sectionId: props.sectionId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const updateCycle = async (editCycle: Cycle): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.updateCycle,
    method: AllowedHttpMethods.put,
    data: editCycle,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeInfo = async (): Promise<EditITDeclarationEmployeeDetails> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.getEmployeeDetails,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isITFormEditable = async (itFormId: number): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.isITFormEditable,
    method: AllowedHttpMethods.post,
    params: {
      itFormId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editITForm = async (data: FinalUpdateITFormDTO): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: itDeclarationListApiConfig.editITForm,
    method: AllowedHttpMethods.put,
    data,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

export const itDeclarationListApi = {
  getCycles,
  getITDeclarationForm,
  exportITDeclarationList,
  getSections,
  addSection,
  deleteSection,
  updateSection,
  getInvestments,
  addInvestment,
  deleteInvestment,
  addCycle,
  deleteCycle,
  isCycleExist,
  updateCycle,
  isInvestmentExist,
  updateInvestment,
  isSectionExist,
  isITFormEditable,
  getEmployeeInfo,
  editITForm,
}
