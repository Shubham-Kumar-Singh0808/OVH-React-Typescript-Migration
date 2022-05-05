import {
  AddUserRoleType,
  FeaturesUnderRoleType,
  UserRoleSubFeaturesType,
  UserRoleType,
  UserRolesAndPermissionsStateType,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  addUserRoleApiCall,
  deleteUserRoleApiCall,
  fetchFeaturesUnderApiCall,
  fetchSubFeaturesApiCall,
  fetchUserRolesApiCall,
  isRoleExitsApiCall,
} from '../../../middleware/api/Settings/UserRolesConfiguration/userRolesAndPermissionsApi'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'

const initialUserRolesPermissionsState = {} as UserRolesAndPermissionsStateType

// fetch user roles action creator
export const doFetchUserRoles = createAsyncThunk<
  UserRoleType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('userRolesAndPermissions/doFetchUserRoles', async (_, thunkApi) => {
  try {
    return await fetchUserRolesApiCall()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

// get Is Role Exists action creator is to check whether the role exists in database
export const doIsRoleExists = createAsyncThunk<
  boolean | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'userRolesAndPermissions/doIsRoleExists',
  async (roleInput: string, thunkApi) => {
    try {
      return await isRoleExitsApiCall(roleInput)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)

// add new user role action creator
export const doAddNewUserRole = createAsyncThunk<
  number | undefined,
  AddUserRoleType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'userRolesAndPermissions/doAddNewUserRole',
  async ({ roleInput, reportingManagerFlag }: AddUserRoleType, thunkApi) => {
    try {
      return await addUserRoleApiCall({ roleInput, reportingManagerFlag })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
// delete role action creator
export const doDeleteUserRole = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('userRolesAndPermissions/doDeleteUserRole', async (id: number, thunkApi) => {
  try {
    return await deleteUserRoleApiCall(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

// fetch user role sub features action creator
export const doFetchUserRoleSubFeatures = createAsyncThunk<
  UserRoleSubFeaturesType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('userRolesAndPermissions/doFetchUserRoleSubFeatures', async (_, thunkApi) => {
  try {
    return await fetchSubFeaturesApiCall()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

// fetch features under role action creator
export const doFetchFeaturesUnderRole = createAsyncThunk<
  FeaturesUnderRoleType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'userRolesAndPermissions/doFetchFeaturesUnderRole',
  async (selectedRoleId: string, thunkApi) => {
    try {
      return await fetchFeaturesUnderApiCall(selectedRoleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)

const userRolesAndPermissionsSlice = createSlice({
  name: 'userRolesAndPermissions',
  initialState: initialUserRolesPermissionsState,
  reducers: {
    clearIsRoleExists(state) {
      state.isRoleExits = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doFetchUserRoles.fulfilled, (state, action) => {
        state.isLoading = false
        state.roles = action.payload as UserRoleType[]
      })
      .addCase(doIsRoleExists.fulfilled, (state, action) => {
        state.isLoading = false
        state.isRoleExits = action.payload as boolean
      })
      .addCase(doFetchUserRoleSubFeatures.fulfilled, (state, action) => {
        state.isLoading = false
        state.subFeatures = action.payload as UserRoleSubFeaturesType[]
      })
      .addCase(doFetchFeaturesUnderRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.featuresUnderRole = action.payload as FeaturesUnderRoleType[]
      })
      .addMatcher(
        isAnyOf(doAddNewUserRole.fulfilled, doDeleteUserRole.fulfilled),
        (state) => {
          state.isLoading = false
        },
      )
      .addMatcher(
        isAnyOf(
          doFetchUserRoles.pending,
          doIsRoleExists.pending,
          doAddNewUserRole.pending,
          doDeleteUserRole.pending,
          doFetchUserRoleSubFeatures.pending,
          doFetchFeaturesUnderRole.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          doFetchUserRoles.rejected,
          doIsRoleExists.rejected,
          doAddNewUserRole.rejected,
          doDeleteUserRole.rejected,
          doFetchUserRoleSubFeatures.rejected,
          doFetchFeaturesUnderRole.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationErrorType
        },
      )
  },
})
export const { clearIsRoleExists } = userRolesAndPermissionsSlice.actions

export const selectIsRoleExists = (state: RootState): boolean =>
  state.userRolesAndPermissions.isRoleExits as boolean

export default userRolesAndPermissionsSlice.reducer
