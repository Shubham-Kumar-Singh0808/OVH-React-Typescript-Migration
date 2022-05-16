import { AppDispatch, RootState } from '../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { BasicInformationState } from '../../../types/MyProfile/BasicInfoTab/basicInformationType'
import { ValidationError } from '../../../types/commonTypes'
import { updateDefaultPicOnGenderChange } from '../../../middleware/api/MyProfile/BasicInfoTab/basicInfoApi'

export const updateEmployeeDefaultPic = createAsyncThunk<
  number | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'basicInformation/updateEmployeeDefaultPic',
  async (gender: string, thunkApi) => {
    try {
      return await updateDefaultPicOnGenderChange(gender)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialBasicInformationState: BasicInformationState = {
  isLoading: false,
}

const basicInformationSlice = createSlice({
  name: 'basicInformation',
  initialState: initialBasicInformationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(updateEmployeeDefaultPic.pending), (state) => {
        state.isLoading = true
      })
      .addMatcher(isAnyOf(updateEmployeeDefaultPic.fulfilled), (state) => {
        state.isLoading = false
      })
  },
})

export default basicInformationSlice.reducer
