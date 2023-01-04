import KRAReducer, { KRAService } from './KRASlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  KRADataQueryBody,
  KRAInitialState,
  KRAPages,
  KRATableDataItem,
} from '../../../types/Performance/KRA/KRATypes'

describe('KRA Slice', () => {
  const kraQueryInitial: KRADataQueryBody = {
    departmentId: -1,
    designationId: '',
    startIndex: 0,
    endIndex: 20,
    multipleSearch: '',
  }

  const initialEditKra: KRATableDataItem = {
    id: -1,
    name: '',
    description: null,
    kpiLookps: null,
    count: -1,
    checkType: null,
    designationName: '',
    designationId: -1,
    departmentName: '',
    departmentId: 1,
    designationKraPercentage: -1,
  }

  const initialState: KRAInitialState = {
    isLoading: ApiLoadingState.idle,
    empDepartments: [],
    designations: [],
    kraData: { size: 0, list: [] },
    kpisForIndividualKRAList: [],
    currentPage: 1,
    pageSize: 20,
    krasQuery: kraQueryInitial,
    kraDesigPercentage: -1,
    isNewKRADuplicate: false,
    editThisKra: initialEditKra,
    currentOnScreenPage: KRAPages.kraList, // Used for navigating to different screens. Implemented here because there are many child components and screens. This makes it more efficient
  }

  it('isLoading is set to loading for "getEmpDepartmentThunk"', () => {
    const action = { type: KRAService.getEmpDepartmentThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "getEmpDepartmentThunk"', () => {
    const action = { type: KRAService.getEmpDepartmentThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      empDepartments: undefined,
    })
  })

  it('isLoading is set to rejected for "getEmpDepartmentThunk"', () => {
    const action = { type: KRAService.getEmpDepartmentThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "getDesignationThunk"', () => {
    const action = { type: KRAService.getDesignationThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "getDesignationThunk"', () => {
    const action = { type: KRAService.getDesignationThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      designations: undefined,
    })
  })

  it('isLoading is set to rejected for "getDesignationThunk"', () => {
    const action = { type: KRAService.getDesignationThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "searchKRADataThunk"', () => {
    const action = { type: KRAService.searchKRADataThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "searchKRADataThunk"', () => {
    const action = { type: KRAService.searchKRADataThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      kraData: undefined,
    })
  })

  it('isLoading is set to rejected for "searchKRADataThunk"', () => {
    const action = { type: KRAService.searchKRADataThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "kpisForIndividualKraThunk"', () => {
    const action = { type: KRAService.kpisForIndividualKraThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "kpisForIndividualKraThunk"', () => {
    const action = { type: KRAService.kpisForIndividualKraThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      kpisForIndividualKRAList: undefined,
    })
  })

  it('isLoading is set to rejected for "kpisForIndividualKraThunk"', () => {
    const action = { type: KRAService.kpisForIndividualKraThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "deleteKRAThunk"', () => {
    const action = { type: KRAService.deleteKRAThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "deleteKRAThunk"', () => {
    const action = { type: KRAService.deleteKRAThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })

  it('isLoading is set to rejected for "deleteKRAThunk"', () => {
    const action = { type: KRAService.deleteKRAThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "deleteKPIThunk"', () => {
    const action = { type: KRAService.deleteKPIThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "deleteKPIThunk"', () => {
    const action = { type: KRAService.deleteKPIThunk.fulfilled.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })

  it('isLoading is set to rejected for "deleteKPIThunk"', () => {
    const action = { type: KRAService.deleteKPIThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "getKRADesigPercentageThunk"', () => {
    const action = { type: KRAService.getKRADesigPercentageThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "getKRADesigPercentageThunk"', () => {
    const action = {
      type: KRAService.getKRADesigPercentageThunk.fulfilled.type,
    }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      kraDesigPercentage: undefined,
    })
  })

  it('isLoading is set to rejected for "getKRADesigPercentageThunk"', () => {
    const action = { type: KRAService.getKRADesigPercentageThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "checkNewKRADuplicacyThunk"', () => {
    const action = { type: KRAService.checkNewKRADuplicacyThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "checkNewKRADuplicacyThunk"', () => {
    const action = {
      type: KRAService.checkNewKRADuplicacyThunk.fulfilled.type,
    }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      isNewKRADuplicate: undefined,
    })
  })

  it('isLoading is set to rejected for "checkNewKRADuplicacyThunk"', () => {
    const action = { type: KRAService.checkNewKRADuplicacyThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "addNewKRAThunk"', () => {
    const action = { type: KRAService.addNewKRAThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "addNewKRAThunk"', () => {
    const action = {
      type: KRAService.addNewKRAThunk.fulfilled.type,
    }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })

  it('isLoading is set to rejected for "addNewKRAThunk"', () => {
    const action = { type: KRAService.addNewKRAThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "editThisKraThunk"', () => {
    const action = { type: KRAService.editThisKraThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "editThisKraThunk"', () => {
    const action = {
      type: KRAService.editThisKraThunk.fulfilled.type,
    }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      editThisKra: undefined,
    })
  })

  it('isLoading is set to rejected for "editThisKraThunk"', () => {
    const action = { type: KRAService.editThisKraThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })

  it('isLoading is set to loading for "updateKRAThunk"', () => {
    const action = { type: KRAService.updateKRAThunk.pending.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })

  it('isLoading is set to succeeded for "updateKRAThunk"', () => {
    const action = {
      type: KRAService.updateKRAThunk.fulfilled.type,
    }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })

  it('isLoading is set to rejected for "updateKRAThunk"', () => {
    const action = { type: KRAService.updateKRAThunk.rejected.type }
    const state = KRAReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
    })
  })
})
