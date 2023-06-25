import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  IncomingUserRole,
  MappedFeatureItem,
  OutgoingAddRoleDto,
  OutgoingAssignPermissionDto,
  UserRoleConfigurationModal,
  UserRolesConfigurationSliceState,
} from '../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import userRolesConfigurationsApi from '../../../middleware/api/Settings/UserRolesConfiguration/UserRolesConfigurationApi'
import { ValidationError } from '../../../types/commonTypes'
import {
  initialUserRole,
  initialUserRoleConfigurationModal,
} from '../../../pages/Settings/UserRolesConfiguration/UserRolesConfigurationsHelpers'

const initialUserRolesConfigurationsSliceState: UserRolesConfigurationSliceState =
  {
    isLoading: ApiLoadingState.idle,
    error: null,
    roles: [],
    featuresUnderRole: [], // this stores all the features
    subFeatures: [], // this stores the all the subfeatures of all features
    mappedFeatures: [],
    configurationModal: initialUserRoleConfigurationModal,
    selectedRole: initialUserRole,
  }

const getUserRolesThunk = createAsyncThunk(
  'userRolesConfiguration/getUserRolesThunk',
  async (_, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.getUserRoles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getFeaturesUnderRoleThunk = createAsyncThunk(
  'userRolesConfiguration/getFeaturesUnderRoleThunk',
  async (selectedRoleId: string, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.getUserFeaturesUnderRole(
        selectedRoleId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getUserRoleSubFeatureThunk = createAsyncThunk(
  'userRolesConfiguration/getUserRoleSubFeaturesThunk',
  async (_, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.getUserRoleSubFeatures()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const updateAssignPermissionsThunk = createAsyncThunk(
  'userRolesConfiguration/updateAssignPermissionsThunk',
  async (finalData: OutgoingAssignPermissionDto, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.updateAssignPermissions(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const deleteUserRoleThunk = createAsyncThunk(
  'userRolesConfiguration/deleteUserRoleThunk',
  async (roleId: number, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.deleteUserRole(roleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const isRoleExistsThunk = createAsyncThunk(
  'userRolesConfiguration/isRoleExistsThunk',
  async (roleName: string, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.isRoleExists(roleName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addRoleThunk = createAsyncThunk(
  'userRolesConfiguration/addRoleThunk',
  async (finalParams: OutgoingAddRoleDto, thunkApi) => {
    try {
      return await userRolesConfigurationsApi.addRole(finalParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const userRolesConfigurationsSlice = createSlice({
  name: 'userRolesConfiguration',
  initialState: initialUserRolesConfigurationsSliceState,
  reducers: {
    setMappedFeatures: (state, action: PayloadAction<MappedFeatureItem[]>) => {
      state.mappedFeatures = action.payload
    },
    setDisplayConfigurationModal: (state, action: PayloadAction<boolean>) => {
      state.configurationModal = {
        ...state.configurationModal,
        displayModal: action.payload,
      }
    },
    setIsConfirmButtonDisabledModal: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.configurationModal = {
        ...state.configurationModal,
        isConfirmButtonDisabled: action.payload,
      }
    },
    setConfigurationModal: (
      state,
      action: PayloadAction<UserRoleConfigurationModal>,
    ) => {
      state.configurationModal = action.payload
    },
    setSelectedRole: (state, action: PayloadAction<IncomingUserRole>) => {
      state.selectedRole = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserRolesThunk.fulfilled, (state, action) => {
      state.roles = action.payload
    })
    builder.addCase(getFeaturesUnderRoleThunk.fulfilled, (state, action) => {
      state.featuresUnderRole = action.payload
    })
    builder.addCase(getUserRoleSubFeatureThunk.fulfilled, (state, action) => {
      state.subFeatures = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        getUserRolesThunk.pending,
        getFeaturesUnderRoleThunk.pending,
        getUserRoleSubFeatureThunk.pending,
        updateAssignPermissionsThunk.pending,
        deleteUserRoleThunk.pending,
        isRoleExistsThunk.pending,
        addRoleThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        getUserRolesThunk.fulfilled,
        getFeaturesUnderRoleThunk.fulfilled,
        getUserRoleSubFeatureThunk.fulfilled,
        updateAssignPermissionsThunk.fulfilled,
        deleteUserRoleThunk.fulfilled,
        isRoleExistsThunk.fulfilled,
        addRoleThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getUserRolesThunk.rejected,
        getFeaturesUnderRoleThunk.rejected,
        getUserRoleSubFeatureThunk.rejected,
        updateAssignPermissionsThunk.rejected,
        deleteUserRoleThunk.rejected,
        isRoleExistsThunk.rejected,
        addRoleThunk.rejected,
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const userRolesConfigurationsThunk = {
  getUserRolesThunk,
  getFeaturesUnderRoleThunk,
  getUserRoleSubFeatureThunk,
  updateAssignPermissionsThunk,
  deleteUserRoleThunk,
  isRoleExistsThunk,
  addRoleThunk,
}

export const userRolesConfigurationsServices = {
  ...userRolesConfigurationsThunk,
  actions: userRolesConfigurationsSlice.actions,
}

const userRolesConfigurationReducer = userRolesConfigurationsSlice.reducer
export default userRolesConfigurationReducer
