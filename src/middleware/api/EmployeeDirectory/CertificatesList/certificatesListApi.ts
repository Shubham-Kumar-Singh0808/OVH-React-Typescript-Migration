import { AllowedHttpMethods, certificatesListApiConfig } from '../../apiList'
import {
  CertificateListApiProps,
  GetEmployeeCertificateResponse,
} from '../../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeesCertificates = async (
  props: CertificateListApiProps,
): Promise<GetEmployeeCertificateResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: certificatesListApiConfig.getAllEmployeeCertificates,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      multipleSearch: props.multipleSearch ?? '',
      selectedCertificate: props.selectedCertificate ?? '',
      selectionTechnology: props.selectionTechnology ?? '',
      startIndex: props.startIndex ?? 0,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const certificatesApi = {
  getEmployeesCertificates,
}

export default certificatesApi
