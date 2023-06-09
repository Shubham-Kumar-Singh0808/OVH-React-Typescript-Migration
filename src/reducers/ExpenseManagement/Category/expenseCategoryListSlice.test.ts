import categoryListReducer, {
  categoryListService,
} from './expenseCategoryListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { CategoryListSliceState } from '../../../types/ExpenseManagement/Category/categoryListTypes'
import { mockExpenseCategory } from '../../../test/data/expenseCategoryData'

describe('Expense Category Slice', () => {
  describe('Expense Category', () => {
    const initialCategoryListState: CategoryListSliceState = {
      getAllCategory: [],
      isLoading: ApiLoadingState.idle,
      error: null,
      currentPage: 0,
      pageSize: 0,
    }

    it('Should be able to set isLoading to "loading" if get All Category Data  is pending', () => {
      const action = {
        type: categoryListService.getCategoryList.pending.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if Edit Expense Category Data is pending', () => {
      const action = {
        type: categoryListService.editExpenseCategory.pending.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "loading" if Update expense Category Data is pending', () => {
      const action = {
        type: categoryListService.updateExpenseCategory.pending.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get All Category Data is fulfilled', () => {
      const action = {
        type: categoryListService.getCategoryList.fulfilled.type,
        payload: mockExpenseCategory,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getAllCategory: mockExpenseCategory,
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Edit Expense Category Data is fulfilled', () => {
      const action = {
        type: categoryListService.editExpenseCategory.fulfilled.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Update expense Category Data is fulfilled', () => {
      const action = {
        type: categoryListService.updateExpenseCategory.fulfilled.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if get All Category Data  is rejected', () => {
      const action = {
        type: categoryListService.getCategoryList.rejected.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if get Edit Expense Category Data is rejected', () => {
      const action = {
        type: categoryListService.editExpenseCategory.rejected.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if get Update expense Category Data is rejected', () => {
      const action = {
        type: categoryListService.updateExpenseCategory.rejected.type,
      }
      const state = categoryListReducer(initialCategoryListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        getAllCategory: [],
        currentPage: 0,
        error: null,
        pageSize: 0,
      })
    })
  })
})
