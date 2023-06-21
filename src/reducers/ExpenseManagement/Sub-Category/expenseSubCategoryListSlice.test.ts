import subCategoryReducer, {
  subCategoryListService,
} from './expenseSubCategoryListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { SubCategoryListSliceState } from '../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'
import {
  mockExpenseCategoryList,
  mockExpenseSubCategoryList,
} from '../../../test/data/expenseSubCategoryListData'

describe('Features of Expense Sub-Category Slice', () => {
  describe('Expense Sub-Category features', () => {
    const initialExpenseSubCategoryState: SubCategoryListSliceState = {
      isLoading: ApiLoadingState.idle,
      expenseCategories: [],
      subExpenseCategories: [],
      currentPage: 0,
      pageSize: 0,
    }
    it('Should be able to set isLoading to "loading" if All Categories list is pending', () => {
      const action = {
        type: subCategoryListService.getCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if All Sub-Categories list is pending', () => {
      const action = {
        type: subCategoryListService.getSubCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if Add Sub-Categories list is pending', () => {
      const action = {
        type: subCategoryListService.addSubCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if edit Sub-Categories list is pending', () => {
      const action = {
        type: subCategoryListService.editExpenseSubCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if update Sub-Categories list is pending', () => {
      const action = {
        type: subCategoryListService.updateExpenseSubCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if delete Sub-Categories list is pending', () => {
      const action = {
        type: subCategoryListService.deleteExpenseSubCategoryList.pending.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if All Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.getCategoryList.fulfilled.type,
        payload: mockExpenseCategoryList,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        expenseCategories: mockExpenseCategoryList,
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if All Sub-Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.getSubCategoryList.fulfilled.type,
        payload: mockExpenseSubCategoryList,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        expenseCategories: [],
        subExpenseCategories: mockExpenseSubCategoryList,
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if Add Sub-Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.addSubCategoryList.fulfilled.type,
        payload: mockExpenseSubCategoryList,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        expenseCategories: [],
        subExpenseCategories: mockExpenseSubCategoryList,
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if edit Sub-Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.editExpenseSubCategoryList.fulfilled.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if update Sub-Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.updateExpenseSubCategoryList.fulfilled
          .type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "Success" if delete Sub-Categories list is fulfilled', () => {
      const action = {
        type: subCategoryListService.deleteExpenseSubCategoryList.fulfilled
          .type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if All Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.getCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if All Sub-Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.getSubCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if Add Sub-Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.addSubCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if edit Sub-Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.editExpenseSubCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if update Sub-Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.updateExpenseSubCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if delete Sub-Categories list is rejected', () => {
      const action = {
        type: subCategoryListService.deleteExpenseSubCategoryList.rejected.type,
      }
      const state = subCategoryReducer(initialExpenseSubCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        expenseCategories: [],
        subExpenseCategories: [],
        currentPage: 0,
        pageSize: 0,
      })
    })
  })
})
