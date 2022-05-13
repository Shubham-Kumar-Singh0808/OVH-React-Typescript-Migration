import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeFamilyDetails,
  FamilyDetailsModal,
  PersonalInfoTabStateType,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import { getEmployeeFamilyDetails } from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
const initialPersonalInfoTabState: PersonalInfoTabStateType = {
  getFamilyDetails: [],
  addFamilyState: {} as EmployeeFamilyDetails,
  error: 0,
  isLoading: false,
}
export const getFamilyDetails = createAsyncThunk<
  FamilyDetailsModal[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'familyDetailsTable/getFamilyDetails',
  async (employeeId: string, thunkApi) => {
    try {
      return await getEmployeeFamilyDetails(employeeId)
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
    builder.addCase(getFamilyDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.getFamilyDetails = action.payload as FamilyDetailsModal[]
    })
  },
})

export const selectGetFamilyDetails = (
  state: RootState,
): FamilyDetailsModal[] => state.familyDetails.getFamilyDetails

export default familyDetailsTableSlice.reducer
