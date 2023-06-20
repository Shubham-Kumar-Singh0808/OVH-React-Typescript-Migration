import {
  CompaniesListTableProps,
  CompaniesListTotalInfo,
  ExportBtnTypes,
} from '../../../../types/Recruitment/CompaniesList/CompaniesListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, CompaniesListApiConfig } from '../../apiList'

const getAllCompanies = async (
  props: CompaniesListTableProps,
): Promise<CompaniesListTotalInfo> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CompaniesListApiConfig.getAllCompanies,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex,
      searchCompany: props.searchCompany,
      selectionTechnology: props.selectionTechnology,
      startIndex: props.startIndex,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const exportCompaniesList = async (
  props: ExportBtnTypes,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: CompaniesListApiConfig.exportCompaniesList,
    method: AllowedHttpMethods.get,
    params: {
      companySearch: props.companySearch,
      selectionTechnology: props.selectionTechnology,
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const CompaniesListApi = {
  getAllCompanies,
  exportCompaniesList,
}

export default CompaniesListApi
