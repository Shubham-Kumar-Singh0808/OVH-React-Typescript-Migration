import addNewAuditFormReducer, { addNewAuditService } from './addNewAuditSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { AddNewAuditSliceState } from '../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'

describe('Add New Audit Form Slice', () => {
  describe('addNewAuditFormReducer', () => {
    const initialAddNewAuditFormState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      saveAuditForm: {
        auditDate: '',
        auditRescheduleStatus: false,
        auditType: '',
        endTime: '',
        formStatus: '',
        projectManagerId: 0,
        projectId: 0,
        projectType: '',
        startTime: '',
        auditeeIds: [],
        auditorIds: [],
        projectName: '',
      },
    } as AddNewAuditSliceState

    it('Should be able to set isLoading to "loading" if saveNewAuditForm is pending', () => {
      const action = {
        type: addNewAuditService.saveNewAuditForm.pending.type,
      }
      const state = addNewAuditFormReducer(initialAddNewAuditFormState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        saveAuditForm: {
          auditDate: '',
          auditRescheduleStatus: false,
          auditType: '',
          endTime: '',
          formStatus: '',
          projectManagerId: 0,
          projectId: 0,
          projectType: '',
          startTime: '',
          auditeeIds: [],
          auditorIds: [],
          projectName: '',
        },
      })
    })
    it('Should be able to set isLoading to "success" if saveNewAuditForm is fulfilled', () => {
      const action = {
        type: addNewAuditService.saveNewAuditForm.fulfilled.type,
      }
      const state = addNewAuditFormReducer(initialAddNewAuditFormState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        saveAuditForm: {
          auditDate: '',
          auditRescheduleStatus: false,
          auditType: '',
          endTime: '',
          formStatus: '',
          projectManagerId: 0,
          projectId: 0,
          projectType: '',
          startTime: '',
          auditeeIds: [],
          auditorIds: [],
          projectName: '',
        },
      })
    })
    it('Should be able to set isLoading to "failed" if getTicketConfigurationDepartments is rejected', () => {
      const action = {
        type: addNewAuditService.saveNewAuditForm.rejected.type,
      }
      const state = addNewAuditFormReducer(initialAddNewAuditFormState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        saveAuditForm: {
          auditDate: '',
          auditRescheduleStatus: false,
          auditType: '',
          endTime: '',
          formStatus: '',
          projectManagerId: 0,
          projectId: 0,
          projectType: '',
          startTime: '',
          auditeeIds: [],
          auditorIds: [],
          projectName: '',
        },
      })
    })
  })
})
