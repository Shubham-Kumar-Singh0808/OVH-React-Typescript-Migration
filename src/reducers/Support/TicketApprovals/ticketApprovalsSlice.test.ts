import ticketApprovalsReducer, {
  ticketApprovalsService,
} from './ticketApprovalsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { TicketApprovalsSliceState } from '../../../types/Support/TicketApprovals/ticketApprovalsTypes'
import {
  mockAllLookUps,
  mockAllTicketApprovals,
  mockDepartmentNamesList,
  mockTrackerList,
} from '../../../test/data/ticketApprovalsData'

describe('Ticket Approvals Slice', () => {
  describe('ticketApprovalsReducer', () => {
    const initialTicketApprovalsState = {
      isLoading: ApiLoadingState.idle,
      departmentNameList: [],
      trackerList: [],
      departmentCategoryList: [],
      subCategoryList: [],
      ticketsForApproval: { size: 0, list: [] },
      getAllLookUps: [],
    } as TicketApprovalsSliceState

    it('Should be able to set isLoading to "loading" if getAllLookUps is pending', () => {
      const action = {
        type: ticketApprovalsService.getAllLookUps.pending.type,
      }
      const state = ticketApprovalsReducer(initialTicketApprovalsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        departmentNameList: [],
        trackerList: [],
        departmentCategoryList: [],
        subCategoryList: [],
        ticketsForApproval: { size: 0, list: [] },
        getAllLookUps: [],
      })
    })

    it('Should be able to set isLoading to "success" if getAllLookUps is fulfilled', () => {
      const action = {
        type: ticketApprovalsService.getAllLookUps.fulfilled.type,
        payload: mockAllLookUps,
      }
      const state = ticketApprovalsReducer(initialTicketApprovalsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        departmentNameList: [],
        trackerList: [],
        departmentCategoryList: [],
        subCategoryList: [],
        ticketsForApproval: { size: 0, list: [] },
        getAllLookUps: mockAllLookUps,
      })
    })

    it('Should be able to set isLoading to "success" if getAllTicketsForApproval is fulfilled', () => {
      const action = {
        type: ticketApprovalsService.getAllTicketsForApproval.fulfilled.type,
        payload: mockAllTicketApprovals,
      }
      const state = ticketApprovalsReducer(initialTicketApprovalsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        departmentNameList: [],
        trackerList: [],
        departmentCategoryList: [],
        subCategoryList: [],
        ticketsForApproval: mockAllTicketApprovals,
        getAllLookUps: [],
      })
    })

    it('Should be able to set isLoading to "success" if getTrackerList is fulfilled', () => {
      const action = {
        type: ticketApprovalsService.getTrackerList.fulfilled.type,
        payload: mockTrackerList,
      }
      const state = ticketApprovalsReducer(initialTicketApprovalsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        departmentNameList: [],
        trackerList: mockTrackerList,
        departmentCategoryList: [],
        subCategoryList: [],
        ticketsForApproval: { size: 0, list: [] },
        getAllLookUps: [],
      })
    })

    it('Should be able to set isLoading to "success" if getDepartmentNameList is fulfilled', () => {
      const action = {
        type: ticketApprovalsService.getDepartmentNameList.fulfilled.type,
        payload: mockDepartmentNamesList,
      }
      const state = ticketApprovalsReducer(initialTicketApprovalsState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        departmentNameList: mockDepartmentNamesList,
        trackerList: [],
        departmentCategoryList: [],
        subCategoryList: [],
        ticketsForApproval: { size: 0, list: [] },
        getAllLookUps: [],
      })
    })
  })
})
