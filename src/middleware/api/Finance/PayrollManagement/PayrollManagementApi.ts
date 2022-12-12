import {
  CurrentPayslip,
  DownloadExcelFile,
  GetPayRollProps,
  GetPaySlipsResponse,
  PayRollManagementApiProps,
} from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { payrollManagementApiConfig, AllowedHttpMethods } from '../../apiList'

const getCurrentPayslip = async (
  props: GetPayRollProps,
): Promise<GetPaySlipsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: payrollManagementApiConfig.getCurrentPayslip,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      month: props.month,
      year: props.year,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const downloadExcelFile = async (
  prepareObject: DownloadExcelFile,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: payrollManagementApiConfig.downloadExcelFile,
    method: AllowedHttpMethods.get,
    params: {
      fileName: prepareObject.fileName,
      token: prepareObject.token,
      tenantKey: prepareObject.tenantKey,
    },
    responseType: 'blob',
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const searchEmployee = async (
  props: PayRollManagementApiProps,
): Promise<GetPaySlipsResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: payrollManagementApiConfig.searchEmployee,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      month: props.month,
      searchStringCand: props.searchStringCand,
      startIndex: props.startIndex ?? 0,
      year: props.year,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deletePayslip = async (paySlipId: number): Promise<number> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: payrollManagementApiConfig.deletePayslip,
    method: AllowedHttpMethods.delete,
    params: {
      paySlipId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const updatePayslip = async (data: CurrentPayslip): Promise<CurrentPayslip> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: payrollManagementApiConfig.updatePayslip,
    method: AllowedHttpMethods.post,
    data,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const PayrollManagementApi = {
  getCurrentPayslip,
  downloadExcelFile,
  searchEmployee,
  deletePayslip,
  updatePayslip,
}

export default PayrollManagementApi
