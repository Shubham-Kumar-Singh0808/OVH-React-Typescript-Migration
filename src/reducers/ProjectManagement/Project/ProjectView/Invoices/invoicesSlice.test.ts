import projectInvoicesReducer, { invoicesService } from './invoicesSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { invoicesListSlice } from '../../../../../types/ProjectManagement/Project/ProjectView/Invoices/invoicesTypes'
import {
  mockInvoicesList,
  mockInvoicesOfMilestoneList,
} from '../../../../../test/data/projectInvoicesData'

describe('invoiceSlice Slice', () => {
  describe('invoiceSlice Reducer', () => {
    const initialInvoicesState = {
      invoicesList: { CRList: [], milestoneList: [] },
      milestoneList: [],
      isLoading: ApiLoadingState.loading,
      invoicesOfMilestoneList: { listSize: 0, list: [] },
    } as invoicesListSlice
    it('Should be able to set isLoading to "loading" if getClosedMilestonesAndCRs is pending', () => {
      const action = {
        type: invoicesService.getClosedMilestonesAndCRs.pending.type,
      }
      const state = projectInvoicesReducer(initialInvoicesState, action)
      expect(state).toEqual({
        invoicesList: { CRList: [], milestoneList: [] },
        milestoneList: [],
        isLoading: ApiLoadingState.loading,
        invoicesOfMilestoneList: { listSize: 0, list: [] },
      })
    })
    it('Should be able to set isLoading to "success" if getClosedMilestonesAndCRs is fulfilled', () => {
      const action = {
        type: invoicesService.getClosedMilestonesAndCRs.fulfilled.type,
        payload: mockInvoicesList,
      }
      const state = projectInvoicesReducer(initialInvoicesState, action)
      expect(state).toEqual({
        invoicesList: mockInvoicesList,
        milestoneList: [],
        invoicesOfMilestoneList: { listSize: 0, list: [] },
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "loading" if getInvoicesOfMilestone is pending', () => {
      const action = {
        type: invoicesService.getInvoicesOfMilestone.pending.type,
      }
      const state = projectInvoicesReducer(initialInvoicesState, action)
      expect(state).toEqual({
        invoicesList: { CRList: [], milestoneList: [] },
        milestoneList: [],
        isLoading: ApiLoadingState.loading,
        invoicesOfMilestoneList: { listSize: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if getInvoicesOfMilestone is fulfilled', () => {
      const action = {
        type: invoicesService.getInvoicesOfMilestone.fulfilled.type,
        payload: mockInvoicesOfMilestoneList,
      }
      const state = projectInvoicesReducer(initialInvoicesState, action)
      expect(state).toEqual({
        invoicesList: { CRList: [], milestoneList: [] },
        milestoneList: [],
        invoicesOfMilestoneList: mockInvoicesOfMilestoneList,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
