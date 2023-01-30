import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import commonAchievementsApi from '../../middleware/api/Achievements/CommonAchievementsApi'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { RootState } from '../../stateStore'
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

const initialState: CommonAchievementInitialState = {
  achievementTypeList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  listSize: 0,
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
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAchievementsType.fulfilled, (state, action) => {
      const data = JSON.parse(
        JSON.stringify(action.payload),
      ) as IncomingAchievementTypes

      const sortedList = sortByAscendingOrder(data.list)
      const finalData = { ...data, list: sortedList }

      state.achievementTypeList = finalData
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addMatcher(isAnyOf(getAllAchievementsType.pending), (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const pageFromState = (state: RootState): number =>
  state.commonAchievements.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.commonAchievements.pageSize
const listSize = (state: RootState): number => state.commonAchievements.listSize

const commonAchievementsThunk = {
  getAllAchievementsType,
}

const commonAchievementsSelectors = {
  pageFromState,
  pageSizeFromState,
  listSize,
}

export const commonAchievementsService = {
  ...commonAchievementsThunk,
  actions: commonAchievementsSlice.actions,
  selectors: commonAchievementsSelectors,
}

const commonAchievementsReducer = commonAchievementsSlice.reducer
export default commonAchievementsReducer
