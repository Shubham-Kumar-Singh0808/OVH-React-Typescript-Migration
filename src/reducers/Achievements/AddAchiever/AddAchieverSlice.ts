import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AddAchieverApi from '../../../middleware/api/Achievements/AddAchiever/AddAchieverApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverInitialState,
  OutgoingNewAchievementType,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AchievementType } from '../../../types/Achievements/commonAchievementTypes'

const initialState = {
  isLoading: ApiLoadingState.idle,
  achievementTypeDetails: null,
} as AddAchieverInitialState

const addAchievementTypeThunk = createAsyncThunk(
  'addAchiever/addAchievementTypeThunk',
  async (outBody: OutgoingNewAchievementType, thunkApi) => {
    try {
      const data = await AddAchieverApi.addAchievementType(outBody)
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getAchievementTypeDetailsThunk = createAsyncThunk(
  'addAchiever/getAchievementTypeDetailsThunk',
  async (typeId: number, thunkApi) => {
    try {
      const data = await AddAchieverApi.getAchievementTypeDetails(typeId)
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const deleteAchievementTypeThunk = createAsyncThunk(
  'addAchiever/deleteAchievementTypeThunk',
  async (query: AchievementTypeIdQueryParameter, thunkApi) => {
    try {
      return await AddAchieverApi.deleteAchievementType(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addAchieverSlice = createSlice({
  name: 'addAchiever',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.pending,
        deleteAchievementTypeThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.fulfilled,
        deleteAchievementTypeThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    // builder.addCase(
    //   getAchievementTypeDetailsThunk.fulfilled,
    //   (state, action) => {
    //     state.achievementTypeDetails = action.payload.payload
    //   },
    // )
  },
})

const addAchieverThunks = {
  addAchievementTypeThunk,
  getAchievementTypeDetailsThunk,
  deleteAchievementTypeThunk,
}

export const addAchieverServices = {
  ...addAchieverThunks,
  actions: addAchieverSlice.actions,
}

const addAchieverReducer = addAchieverSlice.reducer
export default addAchieverReducer
