import { initialStatusReportFilters } from './InterviewStatusReportSliceConstants'
import interviewStatusReportReducer, {
  interviewStatusReportServices,
} from './InterviewStatusReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { InterviewStatusReportSliceState } from '../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import {
  mockGetEmpCountries,
  mockGetTechnology,
} from '../../../test/data/candidateListData'
import { mockInterviewStatusReportList } from '../../../test/data/InterviewStatusReportData'

describe('Interview Status Report Slice', () => {
  const initialInterviewStatusReportSliceState: InterviewStatusReportSliceState =
    {
      isLoading: ApiLoadingState.idle,
      error: null,
      allEmpCountries: [],
      allTechnology: [],
      filterOptions: initialStatusReportFilters,
      interviewStatusReportList: { size: 0, list: [] },
    }
  it('Should be able to set isLoading to "loading" if getAllTechnologyThunk is pending', () => {
    const action = {
      type: interviewStatusReportServices.getAllTechnologyThunk.pending.type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getAllTechnologyThunk is fulfilled', () => {
    const action = {
      type: interviewStatusReportServices.getAllTechnologyThunk.fulfilled.type,
      payload: mockGetTechnology,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.succeeded,
      allTechnology: mockGetTechnology,
    })
  })
  it('Should be able to set isLoading to "failed" if getAllTechnologyThunk is rejected', () => {
    const action = {
      type: interviewStatusReportServices.getAllTechnologyThunk.rejected.type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if getAllEmpCountriesThunk is pending', () => {
    const action = {
      type: interviewStatusReportServices.getAllEmpCountriesThunk.pending.type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getAllEmpCountriesThunk is fulfilled', () => {
    const action = {
      type: interviewStatusReportServices.getAllEmpCountriesThunk.fulfilled
        .type,
      payload: mockGetEmpCountries,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.succeeded,
      allEmpCountries: mockGetEmpCountries,
    })
  })
  it('Should be able to set isLoading to "failed" if getAllEmpCountriesThunk is rejected', () => {
    const action = {
      type: interviewStatusReportServices.getAllEmpCountriesThunk.rejected.type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('Should be able to set isLoading to "loading" if getInterviewStatusReportThunk is pending', () => {
    const action = {
      type: interviewStatusReportServices.getInterviewStatusReportThunk.pending
        .type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('Should be able to set isLoading to "success" if getInterviewStatusReportThunk is fulfilled', () => {
    const action = {
      type: interviewStatusReportServices.getInterviewStatusReportThunk
        .fulfilled.type,
      payload: mockInterviewStatusReportList,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.succeeded,
      interviewStatusReportList: mockInterviewStatusReportList,
    })
  })
  it('Should be able to set isLoading to "failed" if getInterviewStatusReportThunk is rejected', () => {
    const action = {
      type: interviewStatusReportServices.getInterviewStatusReportThunk.rejected
        .type,
    }
    const state = interviewStatusReportReducer(
      initialInterviewStatusReportSliceState,
      action,
    )
    expect(state).toEqual({
      ...initialInterviewStatusReportSliceState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
})
