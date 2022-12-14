import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AddAchieverApi from '../../../middleware/api/Achievements/AddAchiever/AddAchieverApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverInitialState,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'

const initialState: AddAchieverInitialState = {
  isLoading: ApiLoadingState.idle,
  achievementTypeDetails: null,
}

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
})

const addAchieverThunks = {
  deleteAchievementTypeThunk,
}

export const addAchieverServices = {
  ...addAchieverThunks,
  actions: addAchieverSlice.actions,
}

const addAchieverReducer = addAchieverSlice.reducer
export default addAchieverReducer
