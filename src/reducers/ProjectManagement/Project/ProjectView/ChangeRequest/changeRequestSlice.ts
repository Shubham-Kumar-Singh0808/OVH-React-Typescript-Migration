import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import changeRequestApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ChangeRequest/changeRequestApi'
import { ValidationError } from '../../../../../types/commonTypes'
import { ChangeRequestProps } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'

const getProjectChangeRequestList = createAsyncThunk(
  'project/getProjectChangeRequestList',
  async (props: ChangeRequestProps, thunkApi) => {
    try {
      return await changeRequestApi.getProjectChangeRequestList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
