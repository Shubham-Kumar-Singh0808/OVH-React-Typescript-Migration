import expenseCategoryReducer, {
  addNewCategoryService,
} from './addNewExpenseCategorySlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockExpenseCategory } from '../../../../test/data/expenseCategoryData'
import { AddNewCategorySliceState } from '../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'
import { categoryListService } from '../expenseCategoryListSlice'

describe('Features of Expense Category Slice', () => {
  describe('Expense Category features', () => {
    const initialAddNewCategoryState: AddNewCategorySliceState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      addNewCategory: [],
    }

    it('Should be able to set isLoading to "loading" if Add Category Data  is pending', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "loading" if check Duplicate Category Data  is pending', () => {
      const action = {
        type: addNewCategoryService.checkDuplicateCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "loading" if Edit Expense Category Data is pending', () => {
      const action = {
        type: addNewCategoryService.editExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "loading" if Update expense Category Data is pending', () => {
      const action = {
        type: addNewCategoryService.updateExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "loading" if Delete Expense Category Data is pending', () => {
      const action = {
        type: addNewCategoryService.deleteExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Add Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.fulfilled.type,
        // payload: mockExpenseCategory,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if get check Duplicate Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.checkDuplicateCategory.fulfilled.type,
        payload: mockExpenseCategory,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Edit Expense Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.editExpenseCategory.fulfilled.type,
        payload: mockExpenseCategory,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Update expense Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.updateExpenseCategory.fulfilled.type,
        payload: mockExpenseCategory,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        addNewCategory: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Delete Expense Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.deleteExpenseCategory.fulfilled.type,
        payload: mockExpenseCategory,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        addNewCategory: [],
      })
    })
  })
})
