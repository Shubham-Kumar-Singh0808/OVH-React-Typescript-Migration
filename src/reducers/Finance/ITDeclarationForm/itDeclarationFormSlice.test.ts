import itDeclarationFormReducer, {
  itDeclarationFormService,
} from './itDeclarationFormSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeeDetails,
  ITDeclarationFormSliceState,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'
import {
  mockEmployeeInformation,
  mockSections,
} from '../../../test/data/itDeclarationFormData'
import { mockInvestments } from '../../../test/data/investmentCheckListData'

jest.mock(
  '../../../middleware/api/Finance/ITDeclarationForm/itDeclarationFormApi.ts',
)

describe('IT Declaration List Slice', () => {
  describe('IT Declaration List Reducer', () => {
    const initialITDeclarationListState: ITDeclarationFormSliceState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      formSectionData: [],
      employeeDetails: {} as EmployeeDetails,
      sections: [],
      investments: [],
      submitITDeclarationForm: {
        designation: '',
        employeeId: 0,
        employeeName: '',
        fromDate: '',
        grandTotal: 0,
        isAgree: false,
        itDeclarationFormId: null,
        organisationName: '',
        panNumber: '',
        toDate: '',
        formSectionsDTOs: [],
      },
      itDeclarationFormId: 0,
      itDeclarationFormExist: false,
      grandTotal: 0,
      modal: {
        showModal: false,
        modalDescription: '',
      },
      isSubmitButtonEnabled: false,
      uploadedDocumentId: -1,
    }
    it('Should be able to set isLoading to "loading" if getEmployeeInfo is pending', () => {
      const action = {
        type: itDeclarationFormService.getEmployeeInfo.pending.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getEmployeeInfo` is fulfilled', () => {
      const action = {
        type: itDeclarationFormService.getEmployeeInfo.fulfilled.type,
        payload: mockEmployeeInformation,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDetails: mockEmployeeInformation,
        sections: [],
        investments: [],
        submitITDeclarationForm: {
          designation: '',
          employeeId: 0,
          employeeName: '',
          fromDate: '',
          grandTotal: 0,
          isAgree: false,
          itDeclarationFormId: null,
          organisationName: '',
          panNumber: '',
          toDate: '',
          formSectionsDTOs: [],
        },
        itDeclarationFormId: 0,
        itDeclarationFormExist: false,
        grandTotal: 0,
      })
    })
    it('Should be able to set isLoading to "failed" if `getEmployeeInfo` is rejected', () => {
      const action = {
        type: itDeclarationFormService.getEmployeeInfo.rejected.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getSectionsHavingInvests is pending', () => {
      const action = {
        type: itDeclarationFormService.getSectionsHavingInvests.pending.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getSectionsHavingInvests` is fulfilled', () => {
      const action = {
        type: itDeclarationFormService.getSectionsHavingInvests.fulfilled.type,
        payload: mockSections,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        employeeDetails: {},
        sections: mockSections,
      })
    })
    it('Should be able to set isLoading to "failed" if `getSectionsHavingInvests` is rejected', () => {
      const action = {
        type: itDeclarationFormService.getSectionsHavingInvests.rejected.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getInvestsBySectionId is pending', () => {
      const action = {
        type: itDeclarationFormService.getInvestsBySectionId.pending.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getInvestsBySectionId` is fulfilled', () => {
      const action = {
        type: itDeclarationFormService.getInvestsBySectionId.fulfilled.type,
        payload: mockInvestments,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        investments: mockInvestments,
      })
    })
    it('Should be able to set isLoading to "failed" if `getInvestsBySectionId` is rejected', () => {
      const action = {
        type: itDeclarationFormService.getInvestsBySectionId.rejected.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if isITDeclarationFormExist is pending', () => {
      const action = {
        type: itDeclarationFormService.isITDeclarationFormExist.pending.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `isITDeclarationFormExist` is fulfilled', () => {
      const action = {
        type: itDeclarationFormService.isITDeclarationFormExist.fulfilled.type,
        payload: true,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
        itDeclarationFormExist: true,
      })
    })
    it('Should be able to set isLoading to "failed" if `isITDeclarationFormExist` is rejected', () => {
      const action = {
        type: itDeclarationFormService.isITDeclarationFormExist.rejected.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
    it('should set isLoading to "loading" for "uploadITDeclareDocuments" ', () => {
      const action = {
        type: itDeclarationFormService.uploadITDeclareDocuments.pending.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('should set isLoading to "succeeeded" for "uploadITDeclareDocuments" ', () => {
      const action = {
        type: itDeclarationFormService.uploadITDeclareDocuments.fulfilled.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('should set isLoading to "failed" for "uploadITDeclareDocuments" ', () => {
      const action = {
        type: itDeclarationFormService.uploadITDeclareDocuments.rejected.type,
      }
      const state = itDeclarationFormReducer(
        initialITDeclarationListState,
        action,
      )
      expect(state).toEqual({
        ...initialITDeclarationListState,
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
  })
})
