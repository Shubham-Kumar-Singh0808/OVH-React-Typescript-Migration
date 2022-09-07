import myTicketsReducer, { myTicketsService } from './myTicketsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { MyTicketsSliceState } from '../../../types/Support/MyTickets/myTicketsTypes'

describe('My Tickets Slice', () => {
  describe('clientsReducer', () => {
    const initialMyTicketsState = {
      ticketList: { size: 0, list: [] },
      ticketHistory: { size: 0, list: [] },
      allTickets: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as MyTicketsSliceState
    it('Should be able to set isLoading to "loading" if getTickets is pending', () => {
      const action = {
        type: myTicketsService.getTickets.pending.type,
      }
      const state = myTicketsReducer(initialMyTicketsState, action)
      expect(state).toEqual({
        ticketList: { list: [], size: 0 },
        allTickets: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
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
        allTickets: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
