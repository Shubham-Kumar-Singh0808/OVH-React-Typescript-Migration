import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import mileStoneApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/MileStone/mileStoneApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import { ChangeRequestProps } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  AddMilestoneProps,
  GetCRListForMilestone,
  GetMilestone,
  GetPeopleForMilestone,
  GetWorkDetails,
  GetWorkDetailsProps,
  MileStoneResponse,
  MileStoneSliceState,
  updateMilestoneProps,
} from '../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const getProjectMileStone = createAsyncThunk(
  'projectView/getProjectMileStone',
  async (props: ChangeRequestProps, thunkApi) => {
    try {
      return await mileStoneApi.getProjectMileStone(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editProjectMilestone = createAsyncThunk<
  GetMilestone | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/editProjectMilestone', async (milestoneId: number, thunkApi) => {
  try {
    return await mileStoneApi.editProjectMilestone(milestoneId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getPeopleForMilestone = createAsyncThunk<
  GetPeopleForMilestone[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/GetPeopleForMilestone',
  async (projectId: number | string, thunkApi) => {
    try {
      return await mileStoneApi.getPeopleForMilestone(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getMilestoneNumber = createAsyncThunk<
  number | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/getMilestoneNumber',
  async (projectId: number | string, thunkApi) => {
    try {
      return await mileStoneApi.getMilestoneNumber(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getCRListForMilestone = createAsyncThunk<
  GetCRListForMilestone[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/GetCRListForMilestone',
  async (projectid: number | string, thunkApi) => {
    try {
      return await mileStoneApi.getCRListForMilestone(projectid)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getWorkDetails = createAsyncThunk(
  'projectView/getWorkDetails',
  async (props: GetWorkDetailsProps, thunkApi) => {
    try {
      return await mileStoneApi.getWorkDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addProjectMilestone = createAsyncThunk<
  number | undefined,
  AddMilestoneProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/addProjectMilestone',
  async (milestone: AddMilestoneProps, thunkApi) => {
    try {
      return await mileStoneApi.addProjectMilestone(milestone)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const updateProjectMilestone = createAsyncThunk<
  number | undefined,
  updateMilestoneProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/updateProjectMilestone',
  async (milestone: updateMilestoneProps, thunkApi) => {
    try {
      return await mileStoneApi.updateProjectMilestone(milestone)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const milestoneDelete = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/milestoneDelete', async (milestoneId, thunkApi) => {
  try {
    return await mileStoneApi.milestoneDelete(milestoneId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const closeMilestone = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/closeMilestone', async (milestoneId, thunkApi) => {
  try {
    return await mileStoneApi.closeMilestone(milestoneId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialMileStoneState: MileStoneSliceState = {
  mileStonesList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  getMilestone: {} as GetMilestone,
  getPeopleForMilestone: [] as GetPeopleForMilestone[],
  milestoneNumber: 0,
  getCRListForMilestone: [],
  getWorkDetails: {} as GetWorkDetails,
}

const mileStoneSlice = createSlice({
  name: 'projectView',
  initialState: initialMileStoneState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectMileStone.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.mileStonesList = action.payload
    })
    builder
      .addCase(editProjectMilestone.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getMilestone = action.payload as GetMilestone
      })
      .addCase(editProjectMilestone.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getPeopleForMilestone.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getPeopleForMilestone = action.payload as GetPeopleForMilestone[]
      })
      .addCase(getMilestoneNumber.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.milestoneNumber = action.payload as number
      })
      .addCase(getCRListForMilestone.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getCRListForMilestone = action.payload as GetCRListForMilestone[]
      })
      .addCase(getWorkDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getWorkDetails = action.payload as GetWorkDetails
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectMileStone.isLoading

const projectMileStone = (state: RootState): MileStoneResponse[] =>
  state.projectMileStone.mileStonesList.list

const projectMileStoneSize = (state: RootState): number =>
  state.projectMileStone.mileStonesList.size

const getMilestone = (state: RootState): GetMilestone =>
  state.projectMileStone.getMilestone

const getPeopleMilestone = (state: RootState): GetPeopleForMilestone[] =>
  state.projectMileStone.getPeopleForMilestone

const milestoneNumber = (state: RootState): number =>
  state.projectMileStone.milestoneNumber

const getCRListMilestone = (state: RootState): GetCRListForMilestone[] =>
  state.projectMileStone.getCRListForMilestone

const milestoneWorkDetails = (state: RootState): GetWorkDetails =>
  state.projectMileStone.getWorkDetails

const mileStoneThunk = {
  getProjectMileStone,
  editProjectMilestone,
  getPeopleForMilestone,
  getMilestoneNumber,
  getCRListForMilestone,
  getWorkDetails,
  addProjectMilestone,
  milestoneDelete,
  closeMilestone,
  updateProjectMilestone,
}

const mileStoneSelectors = {
  isLoading,
  projectMileStone,
  projectMileStoneSize,
  getMilestone,
  getPeopleMilestone,
  milestoneNumber,
  getCRListMilestone,
  milestoneWorkDetails,
}

export const mileStoneService = {
  ...mileStoneThunk,
  actions: mileStoneSlice.actions,
  selectors: mileStoneSelectors,
}

export default mileStoneSlice.reducer
