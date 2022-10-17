import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AppHeader from './AppHeader'
import { fireEvent, render, screen, waitFor } from '../test/testUtils'
import { mockSearchEmployee } from '../test/data/employeeProfileDate'
import { ApiLoadingState } from '../middleware/api/apiList'

const searchButtonElement = 'employee-input'
describe('Dashboard AppHeader Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <AppHeader />
      </Router>,
      {
        preloadedState: {
          dashboardEmployeeSearch: {
            employeeProfile: mockSearchEmployee,
            searchString: '',
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  screen.debug()
  test('should render search button without crashing', () => {
    expect(screen.getByPlaceholderText('Search Employee')).toBeInTheDocument()
  })
  test('should redirect to employeeList page when user clicks on search button without search string', async () => {
    const searchInputEl = screen.getByTestId('search-employee-btn')
    // userEvent.type(searchInput, '')
    fireEvent.click(searchInputEl)
    await waitFor(() => {
      // check if a redirect happens after clicking search button to employeeList page
      expect(history.location.pathname).toBe('/')
    })
  })
  //   test('upon providing search text and then clicking enter key it should call a function ', async () => {
  //     const searchInput = screen.getByTestId('searchField')
  //     userEvent.type(searchInput, 'Java')
  //     fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 13 })
  //     await waitFor(() => {
  //       expect(mockSetMultiSearchValue).toBeCalledTimes(1)
  //     })
  //   })
})
