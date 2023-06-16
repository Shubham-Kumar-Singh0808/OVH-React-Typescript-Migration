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
      addExpenseCategory: [],
    }
    it('Should be able to set isLoading to "loading" if Add Category Data  is pending', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.pending.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        addExpenseCategory: [],
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
        addExpenseCategory: [],
      })
    })

    it('Should be able to set isLoading to "failed" if get Add Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.addNewExpenseCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        addExpenseCategory: [],
      })
    })

    it('Should be able to set isLoading to "failed" if get check Duplicate Category Data is rejected', () => {
      const action = {
        type: addNewCategoryService.checkDuplicateCategory.rejected.type,
      }
      const state = expenseCategoryReducer(initialAddNewCategoryState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: undefined,
        addExpenseCategory: [],
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
        addExpenseCategory: [],
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
        addExpenseCategory: [],
      })
    })
  })
})
