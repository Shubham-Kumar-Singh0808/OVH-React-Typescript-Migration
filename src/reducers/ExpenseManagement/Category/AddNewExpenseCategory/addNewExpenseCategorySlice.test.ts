import expenseCategoryReducer, {
  addNewCategoryService,
} from './addNewExpenseCategorySlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AddNewCategorySliceState } from '../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'

describe('Features of Expense Category Slice', () => {
  describe('Expense Category features', () => {
    const initialAddNewCategoryState: AddNewCategorySliceState = {
      isLoading: ApiLoadingState.idle,
      error: null,
    }
    it('Should be able to set isLoading to "loading" if Add Category Data  is pending', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
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
      })
    })

    it('Should be able to set isLoading to "loading" if Edit Expense Category Data is pending', () => {
      const action = {
        type: addNewCategoryService.editExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if Update expense Category Data is pending', () => {
      const action = {
        type: addNewCategoryService.updateExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get Add Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get check Duplicate Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.checkDuplicateCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get Edit Expense Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.editExpenseCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get Update expense Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.updateExpenseCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
      })
    })

    it('Should be able to set isLoading to "failed" if get Delete Expense Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.deleteExpenseCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Add Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.fulfilled.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get check Duplicate Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.checkDuplicateCategory.fulfilled.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Edit Expense Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.editExpenseCategory.fulfilled.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if get Update expense Category Data is fulfilled', () => {
      const action = {
        type: addNewCategoryService.updateExpenseCategory.fulfilled.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })
  })
})
