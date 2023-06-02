// // import React from 'react'
// // import '@testing-library/jest-dom'
// // import { render } from 'react-dom'
// // import { cleanup, waitFor, screen } from '@testing-library/react'
// // import userEvent from '@testing-library/user-event'
// // import AddExpenseCategory from './AddExpenseCategory'
// // import { ApiLoadingState } from '../../../../middleware/api/apiList'
// // import { mockExpenseCategory } from '../../../../test/data/expenseCategoryData'

// // const toRender = (
// //   <div>
// //     <div id="backdrop-root"></div>
// //     <div id="overlay-root"></div>
// //     <div id="root"></div>
// //     <AddExpenseCategory />
// //   </div>
// // )
// // describe('Add Expense Category without data', () => {
// //   test('should render Expense Category component without crashing', () => {
// //     render(toRender, {
// //       preloadedState: {
// //         addExpenseCategoryList: {
// //           addNewCategory: mockExpenseCategory,
// //           isLoading: ApiLoadingState.succeeded,
// //         },
// //       },
// //     })
// //     const categoryElement = screen.getByRole('heading', { name: 'Category' })
// //     expect(categoryElement).toBeInTheDocument()
// //   })
// //   afterEach(cleanup)
// //   test('should able to select values for options for respective select element', () => {
// //     const expenseCategory = screen.getByTestId('categoryName')
// //     userEvent.type(expenseCategory, 'testing')
// //     expect(expenseCategory).toHaveValue('testing')

// //     const addBtnElement = screen.getByRole('button', { name: 'Add' })
// //     expect(addBtnElement).toBeEnabled()
// //     userEvent.click(addBtnElement)

// //     const clearBtnElement = screen.getByRole('button', { name: 'Clear' })
// //     expect(clearBtnElement).toBeEnabled()
// //     userEvent.click(clearBtnElement)
// //   })
// //   test('should display error message, when user enters already existing expense category', async () => {
// //     const inputElement = screen.getByTestId('categoryName')
// //     userEvent.type(inputElement, 'Category TEsting')
// //     await waitFor(() => {
// //       expect(screen.getByText('Category already exist')).toBeInTheDocument()
// //     })
// //   })
// // })

// // describe('Add Expense Category without data', () => {
// //   beforeEach(() => {
// //     render(<AddExpenseCategory />, {
// //       preloadedState: {
// //         addExpenseCategoryList: {
// //           addNewCategory: mockExpenseCategory,
// //         },
// //       },
// //     })
// //   })
// //   test('should render Add button as disabled  initially', () => {
// //     expect(screen.getByTestId('save-btn')).toBeDisabled()
// //   })
// // })

// import React from 'react'
// import { render, fireEvent } from '@testing-library/react'
// import AddExpenseCategory from './AddExpenseCategory'

// test('category input field updates state', () => {
//   const { getByTestId } = render(<AddExpenseCategory />)
//   const categoryInput = getByTestId('categoryName')

//   fireEvent.change(categoryInput, { target: { value: 'Groceries' } })

//   expect(categoryInput).toBe('Groceries')
// })

// test('Add button is disabled when category name is empty', () => {
//   const { getByTestId } = render(<AddExpenseCategory />)
//   const categoryInput = getByTestId('categoryName')
//   const addButton = getByTestId('save-btn')

//   expect(addButton.).toBe(true)

//   fireEvent.change(categoryInput, { target: { value: 'Groceries' } })

//   expect(addButton.disabled).toBe(false)

//   fireEvent.change(categoryInput, { target: { value: '' } })

//   expect(addButton.disabled).toBe(true)
// })

// test('Add button is disabled when category name already exists', () => {
//   const { getByTestId } = render(<AddExpenseCategory />)
//   const categoryInput = getByTestId('categoryName')
//   const addButton = getByTestId('save-btn')

//   fireEvent.change(categoryInput, { target: { value: 'Groceries' } })

//   expect(addButton.disabled).toBe(false)

//   fireEvent.change(categoryInput, { target: { value: 'Groceries' } })

//   expect(addButton.disabled).toBe(true)
// })

// test('Clear button clears the category name and existing category message', () => {
//   const { getByTestId } = render(<AddExpenseCategory />)
//   const categoryInput = getByTestId('categoryName')
//   const clearButton = getByTestId('clear-btn')

//   fireEvent.change(categoryInput, { target: { value: 'Groceries' } })

//   expect(categoryInput.value).toBe('Groceries')

//   fireEvent.click(clearButton)

//   expect(categoryInput.value).toBe('')
// })
