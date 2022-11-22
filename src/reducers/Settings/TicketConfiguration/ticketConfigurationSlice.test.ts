import ticketConfigurationReducer, {
  ticketConfigurationService,
} from './ticketConfigurationSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockCategoryList,
  mockDepartments,
  mockTicketConfigurationCategory,
  mockTicketConfigurationSubCategory,
  mockTicketConfigurationSubCategoryList,
  mockTicketHistoryData,
} from '../../../test/data/ticketConfigurationData'
import { TicketConfigurationState } from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

describe('Ticket Configuration Slice', () => {
  describe('ticketConfigurationReducer', () => {
    const initialTicketConfigurationState = {
      departments: [],
      categories: [],
      subCategories: [],
      subCategoryList: {
        size: 0,
        list: [],
      },
      selectedDepartment: '',
      listSize: 0,
      ticketHistoryDetails: {
        size: 0,
        list: [],
      },
      addSubCategoryDetails: {},
      category: [],
      currentPage: 0,
      pageSize: 0,
      toggle: '',
      isLoading: ApiLoadingState.idle,
      isLoadingFilterOptions: ApiLoadingState.idle,
      error: null,
    } as TicketConfigurationState

    it('Should be able to set isLoading to "loading" if getTicketConfigurationDepartments is pending', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationDepartments
          .pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.loading,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getTicketConfigurationDepartments is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationDepartments
          .fulfilled.type,
        payload: mockDepartments,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: mockDepartments,
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.succeeded,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if getTicketConfigurationDepartments is rejected', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationDepartments
          .rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if getTicketConfigurationCategories is pending', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationCategories
          .pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.loading,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getTicketConfigurationCategories is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationCategories
          .fulfilled.type,
        payload: mockTicketConfigurationCategory,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: mockTicketConfigurationCategory,
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.succeeded,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if getTicketConfigurationCategories is rejected', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationCategories
          .rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if getTicketConfigurationSubCategories is pending', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategories
          .pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.loading,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getTicketConfigurationSubCategories is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategories
          .fulfilled.type,
        payload: mockTicketConfigurationSubCategory,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: mockTicketConfigurationSubCategory,
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.succeeded,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if getTicketConfigurationSubCategories is rejected', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategories
          .rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if getTicketConfigurationSubCategoryList is pending', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategoryList
          .pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getTicketConfigurationSubCategoryList is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategoryList
          .fulfilled.type,
        payload: mockTicketConfigurationSubCategoryList,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: mockTicketConfigurationSubCategoryList,
        selectedDepartment: '',
        listSize: 11,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if getTicketConfigurationSubCategoryList is rejected', () => {
      const action = {
        type: ticketConfigurationService.getTicketConfigurationSubCategoryList
          .rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if deleteSubCategory is pending', () => {
      const action = {
        type: ticketConfigurationService.deleteSubCategory.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if deleteSubCategory is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.deleteSubCategory.fulfilled.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if deleteSubCategory is rejected', () => {
      const action = {
        type: ticketConfigurationService.deleteSubCategory.rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if ticketHistoryDetails is pending', () => {
      const action = {
        type: ticketConfigurationService.ticketHistoryDetails.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if ticketHistoryDetails is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.ticketHistoryDetails.fulfilled.type,
        payload: mockTicketHistoryData,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: mockTicketHistoryData,
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if ticketHistoryDetails is rejected', () => {
      const action = {
        type: ticketConfigurationService.ticketHistoryDetails.rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })

    it('Should be able to set isLoading to "loading" if addSubCategory is pending', () => {
      const action = {
        type: ticketConfigurationService.addSubCategory.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if addSubCategory is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.addSubCategory.fulfilled.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if addSubCategory is rejected', () => {
      const action = {
        type: ticketConfigurationService.addSubCategory.rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if addCategory is pending', () => {
      const action = {
        type: ticketConfigurationService.addCategory.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if addCategory is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.addCategory.fulfilled.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if addCategory is rejected', () => {
      const action = {
        type: ticketConfigurationService.addCategory.rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if getAllCategory is pending', () => {
      const action = {
        type: ticketConfigurationService.getAllCategory.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.loading,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getAllCategory is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.getAllCategory.fulfilled.type,
        payload: mockCategoryList,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: mockCategoryList,
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "failed" if getAllCategory is rejected', () => {
      const action = {
        type: ticketConfigurationService.getAllCategory.rejected.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.failed,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: undefined,
      })
    })
    it('Should be able to set isLoading to "loading" if deleteCategory is pending', () => {
      const action = {
        type: ticketConfigurationService.deleteCategory.pending.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.idle,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if deleteCategory is fulfilled', () => {
      const action = {
        type: ticketConfigurationService.deleteCategory.fulfilled.type,
      }
      const state = ticketConfigurationReducer(
        initialTicketConfigurationState,
        action,
      )
      expect(state).toEqual({
        departments: [],
        categories: [],
        subCategories: [],
        subCategoryList: {
          size: 0,
          list: [],
        },
        addSubCategoryDetails: {},
        category: [],
        currentPage: 0,
        pageSize: 0,
        selectedDepartment: '',
        listSize: 0,
        ticketHistoryDetails: {
          size: 0,
          list: [],
        },
        toggle: '',
        isLoading: ApiLoadingState.succeeded,
        isLoadingFilterOptions: ApiLoadingState.idle,
        error: null,
      })
    })
  })
})
