import { AppDispatch, RootState } from '../../../stateStore'
import {
  ProfileHistoryItem,
  ProfileHistoryState,
} from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import profileHistoryApi from '../../../middleware/api/MyProfile/ProfileHistory/profileHistoryApi'

const getProfileHistory = createAsyncThunk<
  ProfileHistoryItem[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('profileHistory/getProfileHistory', async (employeeId: string, thunkApi) => {
  try {
    return await profileHistoryApi.getProfileHistory(employeeId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const initialProfileHistoryState: ProfileHistoryState = {
  profileHistoryList: [],
  isLoading: false,
  error: null,
}

const profileHistorySlice = createSlice({
  name: 'profileHistory',
  initialState: initialProfileHistoryState,
  reducers: {
    clearProfileHistoryList: (state) => {
      state.profileHistoryList = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileHistory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProfileHistory.fulfilled, (state, action) => {
        state.isLoading = false
        state.profileHistoryList = action.payload as ProfileHistoryItem[]
      })
      .addCase(getProfileHistory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})

const profileHistoryIsLoading = (state: RootState): boolean =>
  state.profileHistory.isLoading
const profileHistoryData = (state: RootState): ProfileHistoryItem[] =>
  state.profileHistory.profileHistoryList

export const profileHistoryThunk = {
  getProfileHistory,
}
export const setProfileHistory = profileHistorySlice.actions
export const profileHistorySelectors = {
  profileHistoryIsLoading,
  profileHistoryData,
}

export default profileHistorySlice.reducer
