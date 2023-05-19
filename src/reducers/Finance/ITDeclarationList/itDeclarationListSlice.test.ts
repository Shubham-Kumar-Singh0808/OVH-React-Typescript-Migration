/* eslint-disable max-lines */
import itDeclarationListReducer, {
  initialEmployeeDetails,
  initialUpdateITDeclarationFormDTO,
  itDeclarationListService,
} from './itDeclarationListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockDeclarationList,
  mockInvestmentCycles,
} from '../../../test/data/itDeclarationListData'
import {
  mockInvestments,
  mockSections,
} from '../../../test/data/investmentCheckListData'
import {
  ITDeclarationFormToggleType,
  ITDeclarationListSliceState,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

describe('IT Declaration List Slice', () => {
  describe('IT Declaration List Reducer', () => {
    const initialITDeclarationListState: ITDeclarationListSliceState = {
      itDeclarationForms: [],
      listSize: 0,
      searchEmployee: '',
      isLoading: ApiLoadingState.idle,
      error: null,
      cycles: [],
      currentPage: 1,
      pageSize: 20,
      toggle: ITDeclarationFormToggleType.HomePage,
      investments: [],
      sections: [],
      updatedITDeclarationFormDTO: initialUpdateITDeclarationFormDTO,
      modal: {
        showModal: false,
        description: '',
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        confirmButtonFunction: () => {},
      },
      sectionsWithInvests: [],
      employeeDetails: initialEmployeeDetails,
      isUpdateITFormButtonEnabled: false,
    }
    it('Should be able to set isLoading to "loading" if getCycles is pending', () => {
      const action = {
        type: itDeclarationListService.getCycles.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getCycles` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getCycles.fulfilled.type,
        payload: mockInvestmentCycles,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        cycles: mockInvestmentCycles,
      })
    })
    it('Should be able to set isLoading to "failed" if `getCycles` is rejected', () => {
      const action = {
        type: itDeclarationListService.getCycles.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getSections is pending', () => {
      const action = {
        type: itDeclarationListService.getSections.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getSections` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getSections.fulfilled.type,
        payload: mockSections,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        sections: mockSections,
      })
    })
    it('Should be able to set isLoading to "failed" if `getSections` is rejected', () => {
      const action = {
        type: itDeclarationListService.getSections.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getCycles is pending', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getITDeclarationForm` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.fulfilled.type,
        payload: mockDeclarationList,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        itDeclarationForms: mockDeclarationList.itforms,
        listSize: mockDeclarationList.itformlistsize,
        searchEmployee: '',
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `getCycles` is rejected', () => {
      const action = {
        type: itDeclarationListService.getITDeclarationForm.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if addSection is pending', () => {
      const action = {
        type: itDeclarationListService.addSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `addSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `addSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.addSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if updateSection is pending', () => {
      const action = {
        type: itDeclarationListService.updateSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `updateSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.updateSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `updateSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.updateSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if deleteSection is pending', () => {
      const action = {
        type: itDeclarationListService.deleteSection.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `deleteSection` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteSection.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteSection` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteSection.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if addInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.addInvestment.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `addInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addInvestment.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `addInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.addInvestment.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if deleteInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `deleteInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteInvestment.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if addCycle is pending', () => {
      const action = {
        type: itDeclarationListService.addCycle.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `addCycle` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.addCycle.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `addCycle` is rejected', () => {
      const action = {
        type: itDeclarationListService.addCycle.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if deleteCycle is pending', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `deleteCycle` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `deleteCycle` is rejected', () => {
      const action = {
        type: itDeclarationListService.deleteCycle.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if isInvestmentExist is pending', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `isInvestmentExist` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `isInvestmentExist` is rejected', () => {
      const action = {
        type: itDeclarationListService.isInvestmentExist.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if updateInvestment is pending', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `updateInvestment` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `updateInvestment` is rejected', () => {
      const action = {
        type: itDeclarationListService.updateInvestment.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if isCycleExist is pending', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `isCycleExist` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `isCycleExist` is rejected', () => {
      const action = {
        type: itDeclarationListService.isCycleExist.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if isSectionExist is pending', () => {
      const action = {
        type: itDeclarationListService.isSectionExist.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `isSectionExist` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.isSectionExist.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `isSectionExist` is rejected', () => {
      const action = {
        type: itDeclarationListService.isSectionExist.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getInvestments is pending', () => {
      const action = {
        type: itDeclarationListService.getInvestments.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getInvestments` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.getInvestments.fulfilled.type,
        payload: mockInvestments,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        investments: mockInvestments,
      })
    })
    it('Should be able to set isLoading to "failed" if `getInvestments` is rejected', () => {
      const action = {
        type: itDeclarationListService.getInvestments.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if updateCycle is pending', () => {
      const action = {
        type: itDeclarationListService.updateCycle.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `updateCycle` is fulfilled', () => {
      const action = {
        type: itDeclarationListService.updateCycle.fulfilled.type,
        payload: mockInvestments,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `updateCycle` is rejected', () => {
      const action = {
        type: itDeclarationListService.updateCycle.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "failed" if `getEmployeeDetails` is rejected', () => {
      const action = {
        type: itDeclarationListService.getEmployeeDetails.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "succeeded" if `getEmployeeDetails` is succeeded', () => {
      const action = {
        type: itDeclarationListService.getEmployeeDetails.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        employeeDetails: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if `getEmployeeDetails` is loading', () => {
      const action = {
        type: itDeclarationListService.getEmployeeDetails.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "failed" if `isITFormEditable` is rejected', () => {
      const action = {
        type: itDeclarationListService.isITFormEditable.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "succeeded" if `isITFormEditable` is succeeded', () => {
      const action = {
        type: itDeclarationListService.isITFormEditable.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "loading" if `isITFormEditable` is loading', () => {
      const action = {
        type: itDeclarationListService.isITFormEditable.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "failed" if `getSectionsHavingInvests` is rejected', () => {
      const action = {
        type: itDeclarationListService.getSectionsHavingInvests.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "succeeded" if `getSectionsHavingInvests` is succeeded', () => {
      const action = {
        type: itDeclarationListService.getSectionsHavingInvests.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        sectionsWithInvests: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if `getSectionsHavingInvests` is loading', () => {
      const action = {
        type: itDeclarationListService.getSectionsHavingInvests.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "failed" if `editITForm` is rejected', () => {
      const action = {
        type: itDeclarationListService.editITForm.rejected.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "succeeded" if `editITForm` is succeeded', () => {
      const action = {
        type: itDeclarationListService.editITForm.fulfilled.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "loading" if `editITForm` is loading', () => {
      const action = {
        type: itDeclarationListService.editITForm.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "failed" if `uploadITDeclarationDocument` is rejected', () => {
      const action = {
        type: itDeclarationListService.uploadITDeclarationDocument.rejected
          .type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "succeeded" if `uploadITDeclarationDocument` is succeeded', () => {
      const action = {
        type: itDeclarationListService.uploadITDeclarationDocument.fulfilled
          .type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "loading" if `uploadITDeclarationDocument` is loading', () => {
      const action = {
        type: itDeclarationListService.uploadITDeclarationDocument.pending.type,
      }
      const state = itDeclarationListReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
  })
})
