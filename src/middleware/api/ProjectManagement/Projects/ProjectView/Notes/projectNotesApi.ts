import {
  ProjectNotesTimeLine,
  PostNotesProps,
} from '../../../../../../types/ProjectManagement/Project/ProjectView/Notes/projectNotesTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'
import { projectNotesApiConfig, AllowedHttpMethods } from '../../../../apiList'

const getProjectNotesTimeLine = async (
  projectid: number | string,
): Promise<ProjectNotesTimeLine[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectNotesApiConfig.projectNotesTimeLine,
    method: AllowedHttpMethods.get,
    params: {
      projectid,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const postProjectNotes = async (
  postNotes: PostNotesProps,
): Promise<number | string> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectNotesApiConfig.projectNotesTimeLine,
    method: AllowedHttpMethods.post,
    data: postNotes,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const uploadProjectNotesImage = async (prepareObject: {
  postid: number
  file: FormData
}): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: projectNotesApiConfig.uploadImage,
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

const projectNotesApi = {
  getProjectNotesTimeLine,
  postProjectNotes,
  uploadProjectNotesImage,
}

export default projectNotesApi
