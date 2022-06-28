import { AppDispatch, RootState } from '../../../stateStore'
import {
  UserAccessToFeatures,
  UserAccessToFeaturesSliceState,
} from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import userAccessToFeaturesApi from '../../../middleware/api/Settings/UserRolesConfiguration/userAccessToFeaturesApi'

const getUserAccessToFeatures = createAsyncThunk<
  UserAccessToFeatures[],
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userAccessToFeatures/getUserAccessToFeatures',
  async (userId: string, thunkApi) => {
    try {
      return await userAccessToFeaturesApi.getUserAccessToFeatures(userId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialUserAccessToFeaturesState: UserAccessToFeaturesSliceState = {
  userAccessToFeatures: [],
  isLoading: ApiLoadingState.idle,
}

const userAccessToFeaturesSlice = createSlice({
  name: 'userAccessToFeatures',
  initialState: initialUserAccessToFeaturesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAccessToFeatures.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.userAccessToFeatures = action.payload
      })
      .addCase(getUserAccessToFeatures.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const userAccessToFeatures = (state: RootState): UserAccessToFeatures[] =>
  state.userAccessToFeatures.userAccessToFeatures

const userAccessToFeaturesThunk = {
  getUserAccessToFeatures,
}

const userAccessToFeaturesSelectors = {
  userAccessToFeatures,
}

export const userAccessToFeaturesService = {
  ...userAccessToFeaturesThunk,
  actions: userAccessToFeaturesSlice.actions,
  selectors: userAccessToFeaturesSelectors,
}

export default userAccessToFeaturesSlice.reducer
