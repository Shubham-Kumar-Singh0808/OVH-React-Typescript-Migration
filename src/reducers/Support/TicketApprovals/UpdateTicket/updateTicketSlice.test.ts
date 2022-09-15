import updateTicketReducer, { updateTicketService } from './updateTicketSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetTicketToEdit,
  UpdateTicketSliceState,
} from '../../../../types/Support/TicketApprovals/UpdateTicket/updateTicketTypes'
import {
  mockActiveEmployees,
  mockTicketDetailsToEdit,
} from '../../../../test/data/updateTicketData'
import { mockTicketListHistoryDetails } from '../../../../test/data/ticketListData'

describe('Update Ticket Slice', () => {
  describe('updateTicketReducer', () => {
    const initialUpdateTicketSliceState = {
      isLoading: ApiLoadingState.idle,
      activeEmployees: [],
      auditDetails: { size: 0, list: [] },
      ticketDetailsToEdit: {} as GetTicketToEdit,
    } as UpdateTicketSliceState

    it('Should be able to set isLoading to "loading" if getActiveEmployeeList is pending', () => {
      const action = {
        type: updateTicketService.getActiveEmployeeList.pending.type,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        activeEmployees: [],
        auditDetails: { size: 0, list: [] },
        ticketDetailsToEdit: {} as GetTicketToEdit,
      })
    })

    it('Should be able to set isLoading to "success" if getActiveEmployeeList is fulfilled', () => {
      const action = {
        type: updateTicketService.getActiveEmployeeList.fulfilled.type,
        payload: mockActiveEmployees,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        activeEmployees: mockActiveEmployees,
        auditDetails: { size: 0, list: [] },
        ticketDetailsToEdit: {} as GetTicketToEdit,
      })
    })

    it('Should be able to set isLoading to "success" if getTicketToEdit is fulfilled', () => {
      const action = {
        type: updateTicketService.getTicketToEdit.fulfilled.type,
        payload: mockTicketDetailsToEdit,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        activeEmployees: [],
        auditDetails: { size: 0, list: [] },
        ticketDetailsToEdit: mockTicketDetailsToEdit,
      })
    })

    it('Should be able to set isLoading to "success" if getAudit is fulfilled', () => {
      const action = {
        type: updateTicketService.getAudit.fulfilled.type,
        payload: mockTicketListHistoryDetails,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        activeEmployees: [],
        auditDetails: mockTicketListHistoryDetails,
        ticketDetailsToEdit: {} as GetTicketToEdit,
      })
    })

    it('Should be able to set isLoading to "success" if uploadSupportDoc is fulfilled', () => {
      const action = {
        type: updateTicketService.uploadSupportDoc.fulfilled.type,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        activeEmployees: [],
        auditDetails: { size: 0, list: [] },
        ticketDetailsToEdit: {} as GetTicketToEdit,
      })
    })

    it('Should be able to set isLoading to "success" if approveTicket is fulfilled', () => {
      const action = {
        type: updateTicketService.approveTicket.fulfilled.type,
      }
      const state = updateTicketReducer(initialUpdateTicketSliceState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        activeEmployees: [],
        auditDetails: { size: 0, list: [] },
        ticketDetailsToEdit: {} as GetTicketToEdit,
      })
    })
  })
})
