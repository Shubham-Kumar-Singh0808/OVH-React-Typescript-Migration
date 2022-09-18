import reducer, { ticketReportService } from './ticketReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { TicketReportSliceState } from '../../../types/Support/Report/ticketReportTypes'
import {
  mockDepartmentNameData,
  mockTicketDetailsData,
  mockTicketReportData,
} from '../../../test/data/ticketReportsData'

describe('Ticket Report Slice', () => {
  describe('Reducer', () => {
    const initialTicketReportState = {
      currentPage: 1,
      pageSize: 20,
      ticketsReportList: [],
      getTicketsReport: { list: [], size: 0 },
      departmentCategoryList: [],
      departmentNameList: [],
      isLoading: ApiLoadingState.idle,
      ticketsDetailsList: [],
      getTicketDetails: { list: [], size: 0 },
    } as TicketReportSliceState

    it('Should be able to set isLoading to "loading" if getTicketsReport is pending', () => {
      const action = {
        type: ticketReportService.getTicketsReport.pending.type,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: [],
        getTicketsReport: { list: [], size: 0 },
        departmentCategoryList: [],
        departmentNameList: [],
        isLoading: ApiLoadingState.loading,
        ticketsDetailsList: [],
        getTicketDetails: { list: [], size: 0 },
      })
    })

    it('Should be able to set isLoading to "loading" if getTicketDetails is pending', () => {
      const action = {
        type: ticketReportService.getTicketDetails.pending.type,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: [],
        getTicketsReport: { list: [], size: 0 },
        departmentCategoryList: [],
        departmentNameList: [],
        isLoading: ApiLoadingState.loading,
        ticketsDetailsList: [],
        getTicketDetails: { list: [], size: 0 },
      })
    })

    it('Should be able to set isLoading to "success" if getTicketsReport is fulfilled', () => {
      const action = {
        type: ticketReportService.getTicketsReport.fulfilled.type,
        payload: mockTicketReportData,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: undefined,
        getTicketsReport: mockTicketReportData,
        departmentCategoryList: [],
        departmentNameList: [],
        isLoading: ApiLoadingState.succeeded,
        ticketsDetailsList: [],
        getTicketDetails: { list: [], size: 0 },
      })
    })

    it('Should be able to set isLoading to "success" if getTicketDetails is fulfilled', () => {
      const action = {
        type: ticketReportService.getTicketDetails.fulfilled.type,
        payload: mockTicketDetailsData,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: [],
        getTicketsReport: { list: [], size: 0 },
        departmentCategoryList: [],
        departmentNameList: [],
        isLoading: ApiLoadingState.succeeded,
        ticketsDetailsList: undefined,
        getTicketDetails: mockTicketDetailsData,
      })
    })

    it('Should be able to set isLoading to "success" if getDepartmentNameList is fulfilled', () => {
      const action = {
        type: ticketReportService.getDepartmentNameList.fulfilled.type,
        payload: mockDepartmentNameData,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: [],
        getTicketsReport: { list: [], size: 0 },
        departmentCategoryList: [],
        departmentNameList: mockDepartmentNameData,
        isLoading: ApiLoadingState.idle,
        ticketsDetailsList: [],
        getTicketDetails: { list: [], size: 0 },
      })
    })
    it('Should be able to set isLoading to "loading" if getDepartmentNameList is pending', () => {
      const action = {
        type: ticketReportService.getDepartmentNameList.pending.type,
      }
      const state = reducer(initialTicketReportState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        ticketsReportList: [],
        getTicketsReport: { list: [], size: 0 },
        departmentCategoryList: [],
        departmentNameList: [],
        isLoading: ApiLoadingState.loading,
        ticketsDetailsList: [],
        getTicketDetails: { list: [], size: 0 },
      })
    })
  })
})
