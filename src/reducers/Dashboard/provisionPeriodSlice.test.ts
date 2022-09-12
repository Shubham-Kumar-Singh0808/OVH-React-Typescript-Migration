import reducer, { provisionPeriodService } from './provisionPeriodSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  mockEmployeeProbationaryEndDates,
  mockUpcomingProvisionList,
} from '../../test/data/upcomingProbationaryListData'
import { EmployeeProvisionPeriodSliceState } from '../../types/Dashboard/ProbationaryEndDates/provisionPeriodTypes'

describe('ProbationaryList Slice', () => {
  describe('Probation Period Reducer', () => {
    const initialProbationaryPeriodState = {
      listSize: 0,
      isLoading: ApiLoadingState.idle,
      error: null,
      upcomingProbationList: [],
    } as EmployeeProvisionPeriodSliceState

    it('Should be able to set isLoading to "loading" if getEmployeesUnderProbationPeriod is pending', () => {
      const action = {
        type: provisionPeriodService.getEmployeesUnderProbationPeriod.pending
          .type,
      }
      const state = reducer(initialProbationaryPeriodState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        listSize: 0,
        error: null,
        upcomingProbationList: [],
      })
    })

    it('Should be able to set isLoading to "success" if getAllUpcomingHolidaysList is fulfilled', () => {
      const action = {
        type: provisionPeriodService.getEmployeesUnderProbationPeriod.fulfilled
          .type,
        payload: mockEmployeeProbationaryEndDates,
      }
      const state = reducer(initialProbationaryPeriodState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        listSize: 3,
        error: null,
        upcomingProbationList: mockEmployeeProbationaryEndDates.list,
      })
    })
  })
})
