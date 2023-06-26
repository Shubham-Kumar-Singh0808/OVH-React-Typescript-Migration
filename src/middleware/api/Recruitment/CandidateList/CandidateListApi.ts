/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AddNewCandidateDTO,
  CandidateListTableProps,
  CandidateTotalInfo,
  EmployeeListItem,
  GetAllJobVacanciesParams,
  GetAllTechnology,
  IncomingAllJobVacanciesList,
  IncomingCompaniesData,
  IncomingEditCandidateData,
  IsEditNewCandidateEmailExistsParams,
  IsEditNewCandidateMobileNumExistsParams,
  UploadCandidateResumeDTO,
  country,
  viewHandlerProps,
} from '../../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, CandidateListApiConfig } from '../../apiList'

const searchScheduledCandidate = async (
  props: CandidateListTableProps,
): Promise<CandidateTotalInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.searchScheduledCandidate,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: props.searchStr,
      endIndex: props.endIndex,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getEmpCountries = async (): Promise<country[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getEmpCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getTechnology = async (): Promise<GetAllTechnology[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllTechnology,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getCountryWiseCandidatesList = async (
  data: viewHandlerProps,
): Promise<CandidateTotalInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getCountryWiseCandidatesList,
    method: AllowedHttpMethods.post,
    data,
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const deleteCandidate = async (candidateId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.deleteCandidate,
    method: AllowedHttpMethods.get,
    params: {
      candidateId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllJobVacancies = async (
  params: GetAllJobVacanciesParams,
): Promise<IncomingAllJobVacanciesList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllJobVacanciesList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: params.endIndex ?? '',
      startIndex: params.startIndex ?? '',
      searchJobTitle: params.searchJobTitle ?? '',
      status: params.status ?? 'open',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployeeDetails = async (): Promise<EmployeeListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllEmployeeDetails,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkCandidateEmail = async (email: string): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.checkCandidateEmail,
    method: AllowedHttpMethods.get,
    params: {
      email,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const checkCandidateMobileNumber = async (
  candidateMobileNumber: string,
): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.checkCandidateMobileNumber,
    method: AllowedHttpMethods.get,
    params: {
      candidateMobileNumber,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllCompaniesData = async (): Promise<IncomingCompaniesData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.getAllCompaniesData,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addNewCandidate = async (
  finalData: AddNewCandidateDTO,
): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.addNewCandidate,
    method: AllowedHttpMethods.post,
    data: finalData,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadCandidateResume = async (
  finalData: UploadCandidateResumeDTO,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.uploadCandidateResume,
    method: AllowedHttpMethods.post,
    params: {
      personId: finalData.personId,
    },
    data: { file: finalData.file },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const addTechnology = async (technology: string): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.addTechnology,
    method: AllowedHttpMethods.post,
    params: {
      technology,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const deleteTechnology = async (technologyId: number): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.deleteTechnology,
    method: AllowedHttpMethods.get,
    params: {
      technologyId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editCandidateData = async (
  candidateId: number,
): Promise<IncomingEditCandidateData> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.editCandidateData,
    method: AllowedHttpMethods.get,
    params: {
      candidateId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isEditNewCandidateEmailExists = async (
  finalParams: IsEditNewCandidateEmailExistsParams,
): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.isEditCandidateMailExists,
    method: AllowedHttpMethods.get,
    params: {
      ...finalParams,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const isEditNewCandidateMobileNumExists = async (
  finalParams: IsEditNewCandidateMobileNumExistsParams,
): Promise<boolean> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.isEditCandidateMobileNumberExists,
    method: AllowedHttpMethods.get,
    params: {
      ...finalParams,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editNewCandidate = async (
  finalData: IncomingEditCandidateData,
): Promise<undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.editNewCandidate,
    method: AllowedHttpMethods.post,
    data: {
      ...finalData,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const downloadFile = async (fileName: string): Promise<Blob> => {
  const tenantKey = localStorage.getItem('tenantKey')!
  const token = localStorage.getItem('token')!
  const requestConfig = getAuthenticatedRequestConfig({
    url: CandidateListApiConfig.downloadFile,
    method: AllowedHttpMethods.get,
    params: {
      fileName,
      tenantKey,
      token,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const candidateListApi = {
  searchScheduledCandidate,
  getEmpCountries,
  getTechnology,
  getCountryWiseCandidatesList,
  deleteCandidate,
  getAllJobVacancies,
  getAllEmployeeDetails,
  checkCandidateEmail,
  checkCandidateMobileNumber,
  getAllCompaniesData,
  addNewCandidate,
  uploadCandidateResume,
  addTechnology,
  deleteTechnology,
  editCandidateData,
  isEditNewCandidateEmailExists,
  isEditNewCandidateMobileNumExists,
  editNewCandidate,
  downloadFile,
}

export default candidateListApi
