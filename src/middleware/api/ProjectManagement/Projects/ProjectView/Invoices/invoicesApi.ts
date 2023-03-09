import {
  InvoicesOfMilestoneList,
  InvoicesList,
  InvoiceSummary,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectInvoicesApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getClosedMilestonesAndCRs = async (
  projectId: number | string,
): Promise<InvoicesList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectInvoicesApiConfig.getClosedMilestonesAndCRs,
    method: AllowedHttpMethods.get,
    params: {
      projectId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInvoicesOfMilestone = async (
  milestoneId: number,
): Promise<InvoicesOfMilestoneList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectInvoicesApiConfig.getInvoicesOfMilestone,
    method: AllowedHttpMethods.get,
    params: {
      milestoneId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getInvoiceSummary = async (
  invoiceId: number,
): Promise<InvoiceSummary> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectInvoicesApiConfig.getInvoiceSummary,
    method: AllowedHttpMethods.get,
    params: {
      invoiceId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const invoicesApi = {
  getClosedMilestonesAndCRs,
  getInvoicesOfMilestone,
  getInvoiceSummary,
}

export default invoicesApi
