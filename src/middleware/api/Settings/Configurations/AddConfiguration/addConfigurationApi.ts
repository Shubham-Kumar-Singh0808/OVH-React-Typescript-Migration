import { AddCycle } from '../../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../utils/apiUtils'
import {
  addConfigurationsApiConfig,
  AllowedHttpMethods,
} from '../../../apiList'

const getAddAppraisalCycle = async ({
  active,
  appraisalDuration,
  appraisalEndDate,
  appraisalStartDate,
  appraisalType,
  description,
  fromDate,
  level,
  name,
  servicePeriod,
  toDate,
}: {
  active: string
  appraisalDuration: number
  appraisalEndDate: string
  appraisalStartDate: string
  appraisalType: string
  description: string
  fromDate: string
  level: number
  name: string
  servicePeriod: string
  toDate: string
}): Promise<AddCycle[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: addConfigurationsApiConfig.addAppraisalCycle,
    method: AllowedHttpMethods.post,
    data: {
      active,
      appraisalDuration,
      appraisalEndDate,
      appraisalStartDate,
      appraisalType,
      description,
      fromDate,
      level,
      name,
      servicePeriod,
      toDate,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}
const addConfigurationApi = {
  getAddAppraisalCycle,
}

export default addConfigurationApi
