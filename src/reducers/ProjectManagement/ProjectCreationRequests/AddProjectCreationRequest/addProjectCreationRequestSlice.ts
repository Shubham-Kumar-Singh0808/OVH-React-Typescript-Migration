import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import addProjectCreationRequestApi from '../../../../middleware/api/ProjectManagement/ProjectCreationRequests/AddProjectCreationRequestApi'
import { ValidationError } from '../../../../types/commonTypes'

const getCheckList = createAsyncThunk(
  'addProjectCreationRequest/getCheckList',
  async (_, thunkApi) => {
    try {
      return await addProjectCreationRequestApi.getCheckList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectRequestMailIds = createAsyncThunk(
  'addProjectCreationRequest/getProjectRequestMailIds',
  async (_, thunkApi) => {
    try {
      return await addProjectCreationRequestApi.getProjectRequestMailIds()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addProjectCreationRequestThunk = {
  getCheckList,
  getProjectRequestMailIds,
}

export const addProjectCreationRequestService = {
  ...addProjectCreationRequestThunk,
  actions: addProjectCreationRequestSlice.actions,
  selectors: addProjectCreationRequestSelectors,
}

export default addProjectCreationRequestSlice.reducer
