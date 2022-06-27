import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import userAccessToFeaturesApi from '../../../middleware/api/Settings/UserRolesConfiguration/userAccessToFeaturesApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import {
  UserAccessToFeatures,
  UserAccessToFeaturesSliceState,
} from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

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
      .addMatcher(isAnyOf(getUserAccessToFeatures.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const userAccessToFeaturesThunk = {
  getUserAccessToFeatures,
}

export const certificateListService = {
  ...userAccessToFeaturesThunk,
  actions: userAccessToFeaturesSlice.actions,
}

export default userAccessToFeaturesSlice.reducer
