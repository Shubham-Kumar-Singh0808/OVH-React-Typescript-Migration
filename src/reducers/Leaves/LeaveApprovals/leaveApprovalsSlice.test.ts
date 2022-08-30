import moment from 'moment'
import leaveApprovalsReducer, {
  leaveApprovalsService,
} from './leaveApprovalsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { LeaveApprovalsSliceState } from '../../../types/Leaves/LeaveApprovals/leaveApprovalsTypes'
import { mockEmployeeList } from '../../../test/data/employeeListData'
import {
  mockEmployeesLeaves,
  mockSearchEmployeesLeaves,
} from '../../../test/data/leaveApprovalsData'

const commonFormatDate = 'l'
const currentYear = new Date().getFullYear()
const mockPreviousMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth() - 1),
  Number(25),
)
const mockCurrentMonthResult = new Date(
  Number(currentYear),
  Number(new Date().getMonth()),
  Number(24),
)
describe('leave Approvals Slice', () => {
  describe('leave Approvals Reducer', () => {
    const initialLeaveApprovalsState = {
      getEmployees: [],
      employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
      searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
      isLoading: ApiLoadingState.idle,
      filterOptions: {
        isViewBtnClick: false,
        selectStatus: 'PendingApproval',
        selectMember: null,
        filterByFromDate: moment(mockPreviousMonthResult).format(
          commonFormatDate,
        ),
        filterByToDate: moment(mockCurrentMonthResult).format(commonFormatDate),
      },
    } as LeaveApprovalsSliceState

    it('Should be able to set isLoading to "loading" if getEmployees is pending', () => {
      const action = {
        type: leaveApprovalsService.getEmployees.pending.type,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "success" if getEmployees is fulfilled', () => {
      const action = {
        type: leaveApprovalsService.getEmployees.fulfilled.type,
        payload: mockEmployeeList,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: mockEmployeeList,
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "loading" if getSearchEmployees is pending', () => {
      const action = {
        type: leaveApprovalsService.getSearchEmployees.pending.type,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.loading,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "success" if getSearchEmployees is fulfilled', () => {
      const action = {
        type: leaveApprovalsService.getSearchEmployees.fulfilled.type,
        payload: mockSearchEmployeesLeaves,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: mockSearchEmployeesLeaves,
        isLoading: ApiLoadingState.succeeded,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeLeaves is fulfilled', () => {
      const action = {
        type: leaveApprovalsService.getEmployeeLeaves.fulfilled.type,
        payload: mockEmployeesLeaves,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: mockEmployeesLeaves,
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "success" if leaveApprove is fulfilled', () => {
      const action = {
        type: leaveApprovalsService.leaveApprove.fulfilled.type,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })

    it('Should be able to set isLoading to "success" if leaveReject is fulfilled', () => {
      const action = {
        type: leaveApprovalsService.leaveReject.fulfilled.type,
      }
      const state = leaveApprovalsReducer(initialLeaveApprovalsState, action)
      expect(state).toEqual({
        getEmployees: [],
        employeeLeaves: { allEmpLeavesList: [], employeeSummary: [], size: 0 },
        searchEmployeeLeaves: { leaveSummary: [], searchLeaves: [], size: 0 },
        isLoading: ApiLoadingState.succeeded,
        filterOptions: {
          isViewBtnClick: false,
          selectStatus: 'PendingApproval',
          selectMember: null,
          filterByFromDate: moment(mockPreviousMonthResult).format(
            commonFormatDate,
          ),
          filterByToDate: moment(mockCurrentMonthResult).format(
            commonFormatDate,
          ),
        },
      })
    })
  })
})
