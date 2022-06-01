import { AppDispatch, RootState } from '../../../../../stateStore'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { EmployeeShiftDetails } from '../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { ValidationError } from '../../../../../types/commonTypes'
import shiftConfigurationApi from '../../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationApi'

// fetch user roles action creator
export const getEmployeeShifts = createAsyncThunk<
  EmployeeShiftDetails[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/doFetchUserRoles', async (_, thunkApi) => {
  try {
    return await shiftConfigurationApi.getEmployeeShifts()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const shiftConfigurationSlice = createSlice({
  name: 'authentication',
  initialState: null,
  reducers: {},
})

export default shiftConfigurationSlice.reducer
