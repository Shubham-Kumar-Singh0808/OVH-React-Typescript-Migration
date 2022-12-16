import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AddAchieverApi from '../../../middleware/api/Achievements/AddAchiever/AddAchieverApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverInitialState,
  OutgoingNewAchievementType,
  OutgoingUpdateAchievementType,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { AchievementType } from '../../../types/Achievements/commonAchievementTypes'
import { ValidationError } from '../../../types/commonTypes'

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
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAchievementTypeDetailsThunk = createAsyncThunk(
  'addAchiever/getAchievementTypeDetailsThunk',
  async (query: AchievementTypeIdQueryParameter, thunkApi) => {
    try {
      const data = await AddAchieverApi.getAchievementTypeDetails(query)
      return thunkApi.fulfillWithValue(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateAchievementTypeDetailsThunk = createAsyncThunk(
  'addAchiever/updateAchievementTypeDetailsThunk',
  async (body: OutgoingUpdateAchievementType, thunkApi) => {
    try {
      return await AddAchieverApi.updateAchievementTypeDetails(body)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
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
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addAchieverSlice = createSlice({
  name: 'addAchiever',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAchievementTypeDetailsThunk.fulfilled,
      (state, action) => {
        const data = JSON.parse(JSON.stringify(action.payload))
        state.achievementTypeDetails = data as AchievementType
      },
    )
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.pending,
        deleteAchievementTypeThunk.pending,
        updateAchievementTypeDetailsThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.fulfilled,
        deleteAchievementTypeThunk.fulfilled,
        updateAchievementTypeDetailsThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
  },
})

const addAchieverThunks = {
  addAchievementTypeThunk,
  getAchievementTypeDetailsThunk,
  updateAchievementTypeDetailsThunk,
  deleteAchievementTypeThunk,
}

export const addAchieverServices = {
  ...addAchieverThunks,
  actions: addAchieverSlice.actions,
}

const addAchieverReducer = addAchieverSlice.reducer
export default addAchieverReducer
