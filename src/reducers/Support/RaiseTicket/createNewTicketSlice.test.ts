import createNewTicketReducer, {
  createNewTicketService,
} from './createNewTicketSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  CreateNewTicket,
  createNewTicketSliceState,
} from '../../../types/Support/RaiseNewTicket/createNewTicketTypes'

describe('Create New Ticket Slice', () => {
  describe('CreateNewTicket  Reducer', () => {
    const initialCreateTicketState = {
      createNewTicket: {} as CreateNewTicket,
      isLoading: ApiLoadingState.idle,
    } as createNewTicketSliceState
    it('Should be able to set isLoading to "loading" if createNewTicket is pending', () => {
      const action = {
        type: createNewTicketService.createNewTicket.pending.type,
      }
      const state = createNewTicketReducer(initialCreateTicketState, action)
      expect(state).toEqual({
        createNewTicket: {},

        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "loading" if uploadSupportTicketsDocuments is pending', () => {
      const action = {
        type: createNewTicketService.uploadSupportTicketsDocuments.pending.type,
      }
      const state = createNewTicketReducer(initialCreateTicketState, action)
      expect(state).toEqual({
        createNewTicket: {},

        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if createNewTicket is fulfilled', () => {
      const action = {
        type: createNewTicketService.createNewTicket.fulfilled.type,
      }
      const state = createNewTicketReducer(initialCreateTicketState, action)
      expect(state).toEqual({
        createNewTicket: {},
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "success" if uploadSupportTicketsDocuments is fulfilled', () => {
      const action = {
        type: createNewTicketService.uploadSupportTicketsDocuments.fulfilled
          .type,
      }
      const state = createNewTicketReducer(initialCreateTicketState, action)
      expect(state).toEqual({
        createNewTicket: {},
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
