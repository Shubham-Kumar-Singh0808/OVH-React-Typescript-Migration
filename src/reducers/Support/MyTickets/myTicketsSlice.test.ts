import myTicketsReducer, { myTicketsService } from './myTicketsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { MyTicketsSliceState } from '../../../types/Support/MyTickets/myTicketsTypes'
import stateStore from '../../../stateStore'

describe('My Tickets Slice', () => {
  describe('MyTickets Reducer', () => {
    const initialMyTicketsState = {
      ticketList: { size: 0, list: [] },
      ticketHistory: { size: 0, list: [] },
      allTickets: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
      toggle: '',
    } as MyTicketsSliceState
    it('Should be able to set isLoading to "loading" if getTickets is pending', () => {
      const action = {
        type: myTicketsService.getTickets.pending.type,
      }
      const state = myTicketsReducer(initialMyTicketsState, action)
      expect(state).toEqual({
        ticketList: { list: [], size: 0 },
        ticketHistory: { size: 0, list: [] },
        allTickets: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    it('Should be able to set isLoading to "success" if getTickets is fulfilled', () => {
      const action = {
        type: myTicketsService.getTickets.fulfilled.type,
        // payload: mockEmployeeTicketList,
      }
      const state = myTicketsReducer(initialMyTicketsState, action)
      expect(state).toEqual({
        ticketList: undefined,
        ticketHistory: { size: 0, list: [] },
        allTickets: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        toggle: '',
      })
    })
    test('able to update toggle value', () => {
      stateStore.dispatch(myTicketsService.actions.toggle('test'))
      const state = stateStore.getState().tickets
      expect(state.toggle).toBe('test')
    })
  })
})
