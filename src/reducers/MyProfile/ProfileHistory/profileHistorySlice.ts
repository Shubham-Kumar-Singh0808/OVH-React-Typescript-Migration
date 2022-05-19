import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  profileHistoryItem,
  profileHistoryState,
} from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'

import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import profileHistoryApi from '../../../middleware/api/MyProfile/ProfileHistory/profileHistoryApi'

const getProfileHistory = createAsyncThunk(
  'profileHistory/getProfileHistory',
  async (employeeId: string, thunkApi) => {
    try {
      return await profileHistoryApi.getProfileHistory(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialProfileHistoryState = {} as profileHistoryState

const profileHistorySlice = createSlice({
  name: 'profileHistory',
  initialState: initialProfileHistoryState,
  reducers: {
    setProfileHistory: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileHistory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfileHistory.fulfilled, (state, action) => {
        state.profileHistoryList = action.payload as profileHistoryItem[]
      })
      .addCase(getProfileHistory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setProfileHistory } = profileHistorySlice.actions

const profileHistoryData = (state: RootState): profileHistoryItem[] =>
  state.profileHistory.profileHistoryList

export const getProfileHistoryThunk = {
  getProfileHistory,
}

export const profileHistorySelectors = {
  profileHistoryData,
}

export default profileHistorySlice.reducer
