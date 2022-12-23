import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AddNomineeApiConfig, AllowedHttpMethods } from '../../apiList'

const nominationFormDetails = async () => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddNomineeApiConfig.nominationFormDetails,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddNomineeApi = {
  nominationFormDetails,
}

export default AddNomineeApi
