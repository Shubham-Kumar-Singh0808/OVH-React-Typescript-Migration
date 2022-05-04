import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { employeeSkillList, methods } from '../../../../middleware/api/apiList'
import {
  SkillDetailsModal,
  SkillDetailsArrayModal,
} from '../../../../types/MyProfile/QualificationTab/EmployeeSkill/employeeSkillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const initialSkillDetailsState: SkillDetailsArrayModal = {
  SkillDetails: [],
  isLoading: false,
}
export const doFetchEmployeeSkills = createAsyncThunk<SkillDetailsModal[]>(
  'employeeSkillSlice/doFetchEmployeeSkills',
  async () => {
    const requestConfig = getAuthenticatedRequestConfig({
      url: employeeSkillList.getEmployeeSkillsList,
      method: methods.get,
    })

    const response = await axios(requestConfig)
    console.log(response)
    return response.data as SkillDetailsModal[]
  },
)

const employeeSkillsTableSlice = createSlice({
  name: 'employeeSkillSlice',
  initialState: initialSkillDetailsState,
  reducers: {
    setEmployeeSkills(state, action: PayloadAction<SkillDetailsModal[]>) {
      state.SkillDetails = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(doFetchEmployeeSkills.pending, (state) => {
        state.isLoading = true
      })
      .addCase(doFetchEmployeeSkills.fulfilled, (state, action) => {
        state.SkillDetails = action.payload
      })
  },
})
export const { setEmployeeSkills } = employeeSkillsTableSlice.actions
export default employeeSkillsTableSlice.reducer
