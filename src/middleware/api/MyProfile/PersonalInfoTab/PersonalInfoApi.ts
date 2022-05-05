import { personalInfoApi, methods } from '../../apiList'

import { FamilyDetailsModal } from '../../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
export const fetchFamilyDetailsApiCall = async (
  employeeId: number | string,
): Promise<FamilyDetailsModal[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApi.getFamilyDetails,
    method: methods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
