import { ChangeRequestProps } from '../../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  GetMilestone,
  MileStoneDiscussionProps,
  MileStoneHistory,
  MilestoneNewsFeed,
  MileStonesList,
  PostMileStoneProps,
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

const mileStoneTimeLine = async (id: number): Promise<MileStoneHistory[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.mileStoneHistory,
    method: AllowedHttpMethods.get,
    params: {
      id,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getMilestone = async (milestoneId: number): Promise<GetMilestone> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.getMilestone,
    method: AllowedHttpMethods.get,
    params: {
      milestoneId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getMilestoneNewsFeed = async (
  props: MileStoneDiscussionProps,
): Promise<MilestoneNewsFeed[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.milestoneNewsFeed,
    method: AllowedHttpMethods.get,
    params: {
      milestoneId: props.milestoneId ?? 20,
      projectid: props.projectid,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const postProjectMileStone = async (
  postMileStoneProps: PostMileStoneProps,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.postMileStone,
    method: AllowedHttpMethods.post,
    data: postMileStoneProps,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadProjectMileStoneImage = async (prepareObject: {
  postid: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectMileStoneApiConfig.uploadImage,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      postid: prepareObject.postid,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const mileStoneApi = {
  getProjectMileStone,
  mileStoneTimeLine,
  getMilestone,
  getMilestoneNewsFeed,
  postProjectMileStone,
  uploadProjectMileStoneImage,
}

export default mileStoneApi
