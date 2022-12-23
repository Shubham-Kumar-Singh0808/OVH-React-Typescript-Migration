import myKRAsReducer, { myKRAsService } from './myKRAsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockIndividualKRAs,
  mockKPIsForIndividualKra,
} from '../../../test/data/MyKRAsData'

describe('IT Declaration List Slice', () => {
  describe('IT Declaration List Reducer', () => {
    const initialMyKRAsState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      kras: [],
      kpis: [],
    }
    it('Should be able to set isLoading to "loading" if getKRAForIndividualEmployee is pending', () => {
      const action = {
        type: myKRAsService.getKRAForIndividualEmployee.pending.type,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        kras: [],
        kpis: [],
      })
    })
    it('Should be able to set isLoading to "success" if `getKRAForIndividualEmployee` is fulfilled', () => {
      const action = {
        type: myKRAsService.getKRAForIndividualEmployee.fulfilled.type,
        payload: mockIndividualKRAs,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        kras: mockIndividualKRAs,
        kpis: [],
      })
    })
    it('Should be able to set isLoading to "failed" if `getKRAForIndividualEmployee` is rejected', () => {
      const action = {
        type: myKRAsService.getKRAForIndividualEmployee.rejected.type,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        kras: [],
        kpis: [],
      })
    })
    it('Should be able to set isLoading to "loading" if getKPIsForIndividualEmployee is pending', () => {
      const action = {
        type: myKRAsService.getKPIsForIndividualEmployee.pending.type,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        kras: [],
        kpis: [],
      })
    })
    it('Should be able to set isLoading to "success" if `getKPIsForIndividualEmployee` is fulfilled', () => {
      const action = {
        type: myKRAsService.getKPIsForIndividualEmployee.fulfilled.type,
        payload: mockKPIsForIndividualKra,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        kras: [],
        kpis: mockKPIsForIndividualKra,
      })
    })
    it('Should be able to set isLoading to "failed" if `getKPIsForIndividualEmployee` is rejected', () => {
      const action = {
        type: myKRAsService.getKPIsForIndividualEmployee.rejected.type,
      }
      const state = myKRAsReducer(initialMyKRAsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        kras: [],
        kpis: [],
      })
    })
  })
})
