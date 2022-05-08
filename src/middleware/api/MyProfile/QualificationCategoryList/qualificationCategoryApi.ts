import { AllowedHttpMethods, qualificationCategoryApi } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { QualificationCategoryListItem } from '../../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'

export const getAllQualificationCategoryList = async (): Promise<
  QualificationCategoryListItem[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApi.getAllQualificationCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

// export const postNewCategoryByName = async (
//   toAddCategoryName: string,
// ): Promise<QualificationCategoryListItem[]> => {
//   const requestConfig = getAuthenticatedRequestConfig({
//     url: qualificationCategoryApi.addNewQualificationCategory,
//     method: AllowedHttpMethods.get,
//     params: {
//       categoryName: toAddCategoryName,
//     },
//     data: {
//       categoryName: toAddCategoryName,
//     },
//   })

//   const response = await axios(requestConfig)
//   return response.data
// }

export const deleteQualificationCategoryById = async (
  id: number,
): Promise<QualificationCategoryListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: qualificationCategoryApi.deleteQualificationCategory,
    method: AllowedHttpMethods.delete,
    params: {
      id: id,
    },
    data: {
      id: id,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}
