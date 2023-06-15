import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AchieverListApi from '../../../middleware/api/Achievements/AchieverList/AchieverListApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AchievementHistoryTimeline,
  AchievementHistoryTimelineQueryParameters,
  AchieverListQueryParameters,
  AchieverListSliceState,
  AchieverListUserTypes,
  IncomingAchievementHistoryTimelineList,
  IncomingAchieverListType,
  UpdateShowOnDashboardQueryParameters,
} from '../../../types/Achievements/AchieverList/AchieverListTypes'
import { ValidationError } from '../../../types/SidebarMenu/sidebarMenuType'
import { AppDispatch, RootState } from '../../../stateStore'

const sortAchieverListByDatesDescending = (list: AchieverListUserTypes[]) => {
  return list.sort((a, b) => {
    return (
      new Date(b.createdDate.split('/').reverse().join('-')).getTime() -
      new Date(a.createdDate.split('/').reverse().join('-')).getTime()
    )
  })
}

const sortAchievementTimelineByDatesDescending = (
  list: AchievementHistoryTimeline[],
) => {
  return list.sort((a, b) => {
    const aDate = new Date(a.modifiedDate).getTime()
    const bDate = new Date(b.modifiedDate).getTime()
    return bDate - aDate
  })
}

const initialState: AchieverListSliceState = {
  currentPage: 1,
  pageSize: 20,
  isLoading: ApiLoadingState.idle,
  achieverList: { size: 0, list: [] },
  achievementHistoryTimeline: { size: 0, list: [] },
  achieverListQueries: {},
}

const getAllAchieverList = createAsyncThunk(
  'achieverList/getAllAchieverList',
  async (query: AchieverListQueryParameters, thunkApi) => {
    try {
      const data = await AchieverListApi.getAllAchievements(query)
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateAchievementDashboardStatus = createAsyncThunk(
  'achieverList/updateAchievementDashboardStatus',
  async (query: UpdateShowOnDashboardQueryParameters, thunkApi) => {
    try {
      return await AchieverListApi.showOnDashBoard(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAchievementHistoryTimeline = createAsyncThunk(
  'achieverList/getAchievementHistoryTimeline',
  async (query: AchievementHistoryTimelineQueryParameters, thunkApi) => {
    try {
      const data = await AchieverListApi.getAchievementHistoryTimeline(query)
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteAchievement = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('achieverList/deleteAchievement', async (achievementId, thunkApi) => {
  try {
    return await AchieverListApi.deleteAchievement(achievementId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const achieverListSlice = createSlice({
  name: 'achieverList',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setFilterQueries: (state, action) => {
      state.achieverListQueries = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAchieverList.fulfilled, (state, action) => {
      const data = JSON.parse(JSON.stringify(action.payload))
      const sortedData = sortAchieverListByDatesDescending(data.list)
      const toSendData = {
        size: data.size,
        list: sortedData,
      } as IncomingAchieverListType
      state.achieverList = toSendData
    })
    builder.addCase(
      getAchievementHistoryTimeline.fulfilled,
      (state, action) => {
        const data = JSON.parse(JSON.stringify(action.payload))
        const sortedData = sortAchievementTimelineByDatesDescending(data.list)
        const toSendData = {
          size: data.size,
          list: sortedData,
        } as IncomingAchievementHistoryTimelineList
        state.achievementHistoryTimeline = toSendData
      },
    )
    builder.addMatcher(
      isAnyOf(
        updateAchievementDashboardStatus.fulfilled,
        getAllAchieverList.fulfilled,
        getAchievementHistoryTimeline.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllAchieverList.pending,
        updateAchievementDashboardStatus.pending,
        getAchievementHistoryTimeline.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
  },
})

const achieverListThunks = {
  getAllAchieverList,
  updateAchievementDashboardStatus,
  getAchievementHistoryTimeline,
  deleteAchievement,
}

export const achieverListService = {
  ...achieverListThunks,
  actions: achieverListSlice.actions,
}

const achieverListReducer = achieverListSlice.reducer
export default achieverListReducer
