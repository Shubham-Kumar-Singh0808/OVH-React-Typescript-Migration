import {
  AchievementHistoryTimelineQueryParameters,
  AchieverListQueryParameters,
  IncomingAchievementHistoryTimelineList,
  IncomingAchieverListType,
  UpdateShowOnDashboardQueryParameters,
} from '../../../../types/Achievements/AchieverList/AchieverListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AchieverListApiConfig, AllowedHttpMethods } from '../../apiList'

const getAllAchievements = async (
  props: AchieverListQueryParameters,
): Promise<IncomingAchieverListType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AchieverListApiConfig.getAchieverList,
    method: AllowedHttpMethods.get,
    params: {
      achievementTypeId: props.achievementTypeId ?? '',
      dateSelection: props.dateSelection ?? '',
      endIndex: props.endIndex ?? 20,
      fromMonth: props.fromMonth ?? '',
      fromYear: props.fromYear ?? '',
      startIndex: props.startIndex ?? 0,
      toMonth: props.toMonth ?? '',
      toYear: props.toYear ?? '',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const showOnDashBoard = async (
  props: UpdateShowOnDashboardQueryParameters,
): Promise<void> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AchieverListApiConfig.updateShowOnDashbord,
    method: AllowedHttpMethods.post,
    params: {
      achievementId: props.achievementId,
      dashBoardStatus: props.dashBoardStatus,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAchievementHistoryTimeline = async (
  props: AchievementHistoryTimelineQueryParameters,
): Promise<IncomingAchievementHistoryTimelineList> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AchieverListApiConfig.achievementHistoryTimeline,
    method: AllowedHttpMethods.get,
    params: {
      achievementId: props.achievementId,
      filterName: 'achievementHistory',
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteAchievement = async (
  achievementId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: AchieverListApiConfig.deleteAchievement,
    method: AllowedHttpMethods.delete,
    params: {
      achievementId,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const AchieverListApi = {
  getAllAchievements,
  showOnDashBoard,
  getAchievementHistoryTimeline,
  deleteAchievement,
}

export default AchieverListApi
