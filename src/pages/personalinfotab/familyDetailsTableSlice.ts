import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getFamilyDetails, methodGet } from './../../middleware/api/apiList'
import {
  UserHeaders,
  FamilyDetailsModal,
  FamilyDetailsArrayModal,
} from './familyDetailsTableTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from './../../utils/apiUtils'
const initialFamilyDetailsState: FamilyDetailsArrayModal = {
  familyDetails: [],
  isLoading: false,
}
export const doFetchFamilyDetails = createAsyncThunk<
  FamilyDetailsModal[],
  UserHeaders
>(
  'familyDetailsTable/doFetchFamilyDetails',
  async ({ employeeId }: UserHeaders) => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: getFamilyDetails,
      method: methodGet,
      params: {
        loggedInEmpId: employeeId,
      },
    })

    const response = await axios(requestConfig)
    console.log(response)
    return response.data as FamilyDetailsModal[]
  },
)

const familyDetailsTableSlice = createSlice({
  name: 'visaDetailsTable',
  initialState: initialFamilyDetailsState,
  reducers: {
    setUserRoles(state, action: PayloadAction<FamilyDetailsModal[]>) {
      state.familyDetails = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doFetchFamilyDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchFamilyDetails.fulfilled, (state, action) => {
        state.familyDetails = action.payload
      })
  },
})
export const { setUserRoles } = familyDetailsTableSlice.actions
export default familyDetailsTableSlice.reducer
