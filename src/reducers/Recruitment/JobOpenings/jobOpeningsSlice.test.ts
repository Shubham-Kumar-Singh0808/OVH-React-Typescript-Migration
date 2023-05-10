import jobOpeningsReducer, {
  initialJobOpeningsState,
  jobOpeningsService,
} from './jobOpeningsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockJobTechnology } from '../../../test/data/jobVacenciesData'

describe('notification Slice', () => {
  describe('jobOpenings test', () => {
    it('Should be able to set isLoading to "loading" if getAllJobVacancies is pending', () => {
      const action = {
        type: jobOpeningsService.getAllJobVacancies.pending.type,
      }
      const state = jobOpeningsReducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        getAllTechnology: [],
        getAllJobVacancies: [],
      })
    })

    it('Should be able to set isLoading to "failed" if getAllJobVacancies is rejected', () => {
      const action = {
        type: jobOpeningsService.getAllJobVacancies.rejected.type,
      }
      const state = jobOpeningsReducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        listSize: 0,
        getAllTechnology: [],
        getAllJobVacancies: [],
      })
    })
  })
  describe('getAllTechnology test', () => {
    it('Should be able to set isLoading to "loading" if getAllTechnology is pending', () => {
      const action = {
        type: jobOpeningsService.getAllTechnology.pending.type,
      }
      const state = jobOpeningsReducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        getAllTechnology: [],
        getAllJobVacancies: [],
      })
    })

    it('Should be able to set isLoading to "success" if getAllTechnology is fulfilled', () => {
      const action = {
        type: jobOpeningsService.getAllTechnology.fulfilled.type,
        payload: mockJobTechnology,
      }
      const state = jobOpeningsReducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 0,
        getAllTechnology: mockJobTechnology,
        getAllJobVacancies: [],
      })
    })

    it('Should be able to set isLoading to "failed" if getAllTechnology is rejected', () => {
      const action = {
        type: jobOpeningsService.getAllTechnology.rejected.type,
      }
      const state = jobOpeningsReducer(initialJobOpeningsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        listSize: 0,
        getAllTechnology: [],
        getAllJobVacancies: [],
      })
    })
  })
})
