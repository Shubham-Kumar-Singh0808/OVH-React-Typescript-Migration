import { IncomingNominationFormDetails } from '../../../../types/Achievements/AddNominee/AddNomineeTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AddNomineeApiConfig, AllowedHttpMethods } from '../../apiList'

const nominationFormDetails =
  async (): Promise<IncomingNominationFormDetails> => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: AddNomineeApiConfig.nominationFormDetails,
      method: AllowedHttpMethods.get,
    })

    const response = await useAxios(requestConfig)
    return response.data
  }

const addNominee = async (
  outBody: IncomingNominationFormDetails,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AddNomineeApiConfig.addNominee,
    method: AllowedHttpMethods.post,
    data: outBody,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const AddNomineeApi = {
  nominationFormDetails,
  addNominee,
}

export default AddNomineeApi
