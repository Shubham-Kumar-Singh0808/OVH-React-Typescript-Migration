import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import addConfigurationApi from '../../../../middleware/api/Settings/Configurations/AddConfiguration/addConfigurationApi'
import { ValidationError } from '../../../../types/commonTypes'

const addNewCycle = createAsyncThunk(
  'addConfiguration/addAppraisalCycle',
  async (
    {
      active,
      appraisalDuration,
      appraisalEndDate,
      appraisalStartDate,
      appraisalType,
      description,
      fromDate,
      level,
      name,
      servicePeriod,
      toDate,
    }: {
      active: string
      appraisalDuration: number
      appraisalEndDate: string
      appraisalStartDate: string
      appraisalType: string
      description: string
      fromDate: string
      level: number
      name: string
      servicePeriod: string
      toDate: string
    },
    thunkApi,
  ) => {
    try {
      return await addConfigurationApi.getAddAppraisalCycle({
        active,
        appraisalDuration,
        appraisalEndDate,
        appraisalStartDate,
        appraisalType,
        description,
        fromDate,
        level,
        name,
        servicePeriod,
        toDate,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
