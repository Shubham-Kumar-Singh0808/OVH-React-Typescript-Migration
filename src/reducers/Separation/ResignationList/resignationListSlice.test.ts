import resignationListReducer, {
  resignationListService,
} from './resignationListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ResignationListSliceState } from '../../../types/Separation/ResignationList/resignationListTypes'

describe('Resign List Slice', () => {
  describe('Resign List Reducer', () => {
    const initialResignationListState = {
      resignationList: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as ResignationListSliceState
    it('Should be able to set isLoading to "loading" if getTickets is pending', () => {
      const action = {
        type: resignationListService.getResignationList.pending.type,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        resignationList: { list: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "success" if getTickets is fulfilled', () => {
      const action = {
        type: resignationListService.getResignationList.fulfilled.type,
        // payload: mockEmployeeTicketList,
      }
      const state = resignationListReducer(initialResignationListState, action)
      expect(state).toEqual({
        ticketList: undefined,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
