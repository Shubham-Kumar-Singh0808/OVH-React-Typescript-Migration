import reducer, { jobVacanciesService } from './jobOpeningsSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { mockJobOpenings } from '../../test/data/jobOpeningsData'
import { JobOpeningsSliceState } from '../../types/Dashboard/JobOpenings/JobOpeningsTypes'

describe('Job Openings Slice', () => {
  describe('Job Openings Reducer', () => {
    const initialJobOpeningsState = {
      jobVacancies: [],
      listSize: 0,
      isLoading: ApiLoadingState.idle,
      error: null,
    } as JobOpeningsSliceState

    it('Should be able to set isLoading to "loading" if getAllJobVacancies is pending', () => {
      const action = {
        type: jobVacanciesService.getAllJobVacancies.pending.type,
      }
      const state = reducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        jobVacancies: [],
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllJobVacancies is fulfilled', () => {
      const action = {
        type: jobVacanciesService.getAllJobVacancies.fulfilled.type,
        payload: mockJobOpenings,
      }
      const state = reducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        jobVacancies: mockJobOpenings,
        listSize: 21,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })
  })
})
