import { AppDispatch, RootState } from '../../../stateStore'
import {
  CreateUserRole,
  UserFeaturesUnderRole,
  UserRole,
  UserRoleSubFeatures,
  UserRolesAndPermissionsState,
  UtilsRenderPermissionSwitchReturn,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import userRolesAndPermissionsApi from '../../../middleware/api/Settings/UserRolesConfiguration/userRolesAndPermissionsApi'

const initialUserRolesPermissionsState = {} as UserRolesAndPermissionsState

// fetch user roles action creator
const getUserRoles = createAsyncThunk<
  UserRole[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/getUserRoles', async (_, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.getUserRoles()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// get Is Role Exists action creator is to check whether the role exists in database
const checkIsRoleExists = createAsyncThunk<
  boolean | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/checkIsRoleExists',
  async (roleInput: string, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.checkIsRoleExits(roleInput)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

// add new user role action creator
const createUserRole = createAsyncThunk<
  number | undefined,
  CreateUserRole,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/createUserRole',
  async ({ roleInput, reportingManagerFlag }: CreateUserRole, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.createUserRole({
        roleInput,
        reportingManagerFlag,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
// delete role action creator
const deleteUserRole = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/deleteUserRole', async (id: number, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.deleteUserRole(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// fetch user role sub features action creator
const getUserRoleSubFeatures = createAsyncThunk<
  UserRoleSubFeatures[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/getUserRoleSubFeatures', async (_, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.getUserRoleSubFeatures()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// fetch features under role action creator
const getUserFeaturesUnderRole = createAsyncThunk<
  UserFeaturesUnderRole[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/getUserFeaturesUnderRole',
  async (selectedRoleId: string, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.getUserFeaturesUnderRole(
        selectedRoleId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateAssignPermission = createAsyncThunk<
  number | undefined,
  UtilsRenderPermissionSwitchReturn,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/updateAssignPermission',
  async (prepareObject: UtilsRenderPermissionSwitchReturn, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.updateAssignPermissions(
        prepareObject,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const userRolesAndPermissionsSlice = createSlice({
  name: 'userRolesAndPermissions',
  initialState: initialUserRolesPermissionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRoles.fulfilled, (state, action) => {
        state.isLoading = false
        state.roles = action.payload as UserRole[]
      })
      .addCase(checkIsRoleExists.fulfilled, (state, action) => {
        state.isLoading = false
        state.isRoleExits = action.payload as boolean
      })
      .addCase(getUserRoleSubFeatures.fulfilled, (state, action) => {
        state.isLoading = false
        state.subFeatures = action.payload as UserRoleSubFeatures[]
      })
      .addCase(getUserFeaturesUnderRole.fulfilled, (state, action) => {
        state.isLoading = false
        state.featuresUnderRole = action.payload as UserFeaturesUnderRole[]
      })
      .addMatcher(
        isAnyOf(
          createUserRole.fulfilled,
          deleteUserRole.fulfilled,
          updateAssignPermission.fulfilled,
        ),
        (state) => {
          state.isLoading = false
        },
      )
      .addMatcher(
        isAnyOf(
          getUserRoles.pending,
          checkIsRoleExists.pending,
          createUserRole.pending,
          deleteUserRole.pending,
          getUserRoleSubFeatures.pending,
          getUserFeaturesUnderRole.pending,
          updateAssignPermission.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getUserRoles.rejected,
          checkIsRoleExists.rejected,
          createUserRole.rejected,
          deleteUserRole.rejected,
          getUserRoleSubFeatures.rejected,
          getUserFeaturesUnderRole.rejected,
          updateAssignPermission.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})

const selectUserRoles = (state: RootState): UserRole[] =>
  state.userRolesAndPermissions.roles

const selectUserRoleSubFeatures = (state: RootState): UserRoleSubFeatures[] =>
  state.userRolesAndPermissions.subFeatures

const selectUserFeaturesUnderRole = (
  state: RootState,
): UserFeaturesUnderRole[] => state.userRolesAndPermissions.featuresUnderRole

export const userRolesAndPermissionsThunk = {
  getUserRoles,
  checkIsRoleExists,
  createUserRole,
  deleteUserRole,
  getUserRoleSubFeatures,
  getUserFeaturesUnderRole,
  updateAssignPermission,
}

export const userRolesAndPermissionsSelectors = {
  selectUserRoles,
  selectUserRoleSubFeatures,
  selectUserFeaturesUnderRole,
}

export default userRolesAndPermissionsSlice.reducer
