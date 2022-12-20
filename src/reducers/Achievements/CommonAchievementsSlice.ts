import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import commonAchievementsApi from '../../middleware/api/Achievements/CommonAchievementsApi'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  AchievementType,
  CommonAchievementInitialState,
  IncomingAchievementTypes,
} from '../../types/Achievements/commonAchievementTypes'
import { ValidationError } from '../../types/commonTypes'

export const sortByAscendingOrder = (
  incomingList: AchievementType[],
): AchievementType[] => {
  return incomingList.sort((a, b) => {
    return a.order - b.order
  })
}

export const sortByDateCreated = (
  incomingList: AchievementType[],
): AchievementType[] => {
  return incomingList.sort((a, b) => {
    return (
      new Date(b.createdDate.split('/').reverse().join('-')).getTime() -
      new Date(a.createdDate.split('/').reverse().join('-')).getTime()
    )
  })
}

const initialState: CommonAchievementInitialState = {
  achievementTypeList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  dateSortedList: { size: 0, list: [] },
}

const getAllAchievementsType = createAsyncThunk(
  'commonAchievements/getAllAchievementsType',
  async (_, thunkApi) => {
    try {
      const data = await commonAchievementsApi.getAllAchievements()
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const commonAchievementsSlice = createSlice({
  name: 'commonAchievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllAchievementsType.fulfilled, (state, action) => {
      const data = JSON.parse(
        JSON.stringify(action.payload),
      ) as IncomingAchievementTypes

      const sortedList = sortByAscendingOrder(data.list)
      const finalData = { ...data, list: sortedList }

      state.achievementTypeList = finalData
      state.dateSortedList = { ...data, list: sortByDateCreated(data.list) }
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addMatcher(isAnyOf(getAllAchievementsType.pending), (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const commonAchievementsThunk = {
  getAllAchievementsType,
}

export const commonAchievementsService = {
  ...commonAchievementsThunk,
  actions: commonAchievementsSlice.actions,
}

const commonAchievementsReducer = commonAchievementsSlice.reducer
export default commonAchievementsReducer
