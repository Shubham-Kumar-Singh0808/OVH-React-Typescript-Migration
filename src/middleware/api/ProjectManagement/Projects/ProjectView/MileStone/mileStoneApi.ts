import { ChangeRequestProps } from '../../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  GetMilestone,
  MileStonesList,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import {
  projectMileStoneApiConfig,
  AllowedHttpMethods,
} from '../../../../apiList'

const getProjectMileStone = async (
  props: ChangeRequestProps,
): Promise<MileStonesList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.mileStonesList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      firstIndex: props.firstIndex ?? 0,
      projectId: props.projectid,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const editProjectMilestone = async (
  milestoneId: number,
): Promise<GetMilestone> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.editMilestone,
    method: AllowedHttpMethods.get,
    params: {
      milestoneId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const mileStoneApi = {
  getProjectMileStone,
  editProjectMilestone,
}

export default mileStoneApi
