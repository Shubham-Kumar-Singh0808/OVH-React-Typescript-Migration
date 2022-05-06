import {
  AddUserRole,
  FeaturesUnderRole,
  UserRole,
  UserRoleSubFeatures,
  UserRolesAndPermissionsState,
  UtilsRenderPermissionSwitchReturn,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  checkIsRoleExits,
  createUserRole,
  deleteUserRole,
  getUserFeaturesUnderRole,
  getUserRoleSubFeatures,
  getUserRoles,
  updateAssignPermissions,
} from '../../../middleware/api/Settings/UserRolesConfiguration/userRolesAndPermissionsApi'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'

const initialUserRolesPermissionsState = {} as UserRolesAndPermissionsState

// fetch user roles action creator
export const doFetchUserRoles = createAsyncThunk<
  UserRole[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('userRolesAndPermissions/doFetchUserRoles', async (_, thunkApi) => {
  try {
    return await getUserRoles()
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
      return await checkIsRoleExits(roleInput)
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
  AddUserRole,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'userRolesAndPermissions/doAddNewUserRole',
  async ({ roleInput, reportingManagerFlag }: AddUserRole, thunkApi) => {
    try {
      return await createUserRole({ roleInput, reportingManagerFlag })
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
    return await deleteUserRole(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

// fetch user role sub features action creator
export const doFetchUserRoleSubFeatures = createAsyncThunk<
  UserRoleSubFeatures[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('userRolesAndPermissions/doFetchUserRoleSubFeatures', async (_, thunkApi) => {
  try {
    return await getUserRoleSubFeatures()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

// fetch features under role action creator
export const doFetchFeaturesUnderRole = createAsyncThunk<
  FeaturesUnderRole[] | undefined,
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
      return await getUserFeaturesUnderRole(selectedRoleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)

export const doAssignRolePermission = createAsyncThunk<
  number | undefined,
  UtilsRenderPermissionSwitchReturn,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>(
  'userRolesAndPermissions/doAssignRolePermission',
  async (prepareObject: UtilsRenderPermissionSwitchReturn, thunkApi) => {
    try {
      return await updateAssignPermissions(prepareObject)
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
        state.roles = action.payload as UserRole[]
      })
      .addCase(doIsRoleExists.fulfilled, (state, action) => {
        state.isLoading = false
        state.isRoleExits = action.payload as boolean
      })
      .addCase(doFetchUserRoleSubFeatures.fulfilled, (state, action) => {
        state.isLoading = false
        state.subFeatures = action.payload as UserRoleSubFeatures[]
      })
      .addCase(doFetchFeaturesUnderRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.featuresUnderRole = action.payload as FeaturesUnderRole[]
      })
      .addMatcher(
        isAnyOf(
          doAddNewUserRole.fulfilled,
          doDeleteUserRole.fulfilled,
          doAssignRolePermission.fulfilled,
        ),
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
          doAssignRolePermission.pending,
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
          doAssignRolePermission.rejected,
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
