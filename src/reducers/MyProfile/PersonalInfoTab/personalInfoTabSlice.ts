import { AppDispatch, RootState } from '../../../stateStore'
import {
  FamilyDetailsModal,
  PersonalInfoTabStateType,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import { fetchFamilyDetailsApiCall } from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
const initialPersonalInfoTabState = {} as PersonalInfoTabStateType
export const doFetchFamilyDetails = createAsyncThunk<
  FamilyDetailsModal[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'familyDetailsTable/doFetchFamilyDetails',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await fetchFamilyDetailsApiCall(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const familyDetailsTableSlice = createSlice({
  name: 'familyDetailsTable',
  initialState: initialPersonalInfoTabState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doFetchFamilyDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.getFamilyDetails = action.payload as FamilyDetailsModal[]
    })
  },
})

export const selectGetFamilyDetails = (
  state: RootState,
): FamilyDetailsModal[] => state.familyDetails.getFamilyDetails

export default familyDetailsTableSlice.reducer
