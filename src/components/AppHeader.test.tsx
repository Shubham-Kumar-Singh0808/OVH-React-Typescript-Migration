import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AppHeader from './AppHeader'
import { cleanup, fireEvent, render, screen, waitFor } from '../test/testUtils'
import { mockSearchEmployee } from '../test/data/employeeProfileDate'
import EmployeeList from '../pages/EmployeeDirectory/EmployeesList/EmployeeList'
import { mockUserAccessToFeaturesData } from '../test/data/userAccessToFeaturesData'

const searchButton = 'search-employee-btn'
const searchEmployeeString = 'Raju Sriramoju'
const searchPlaceholderText = 'Search Employee'
// const mockSearchValue = jest.fn()
describe('Dashboard AppHeader Component Testing', () => {
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
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should render search button without crashing', () => {
      expect(
        screen.getByPlaceholderText(searchPlaceholderText),
      ).toBeInTheDocument()
    })
    test('should render Notification icon without crashing', () => {
      const notificationIcon = screen.getByTestId('notification-button')
      userEvent.click(notificationIcon)
      expect(screen.getByText('Show All Notifications')).toBeInTheDocument()
    })
    test('should render logout button without crashing', () => {
      const logoutButtonIcon = screen.getByTestId('logout-button')
      userEvent.click(logoutButtonIcon)
      expect(screen.getByText('Logout')).toBeInTheDocument()
    })
    test('should redirect to employeeList page when user clicks on search button without search string', () => {
      const searchButtonEl = screen.getByTestId(searchButton)
      userEvent.click(searchButtonEl)
    })
    test('should be able to render search component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText(searchPlaceholderText)
      autocomplete.click()
      autocomplete.focus()
      fireEvent.change(autocomplete, { target: { value: 'Haji Pasha' } })

      const dropdownOptions = screen.getByRole('combobox')
      fireEvent.click(dropdownOptions)

      expect(autocomplete).toHaveValue('Haji Pasha')
    })
    test('should redirect to employeeList page upon clicking the search button without searchString', async () => {
      const autocomplete = screen.getByPlaceholderText(searchPlaceholderText)
      autocomplete.click()
      autocomplete.focus()
      fireEvent.change(autocomplete, {
        target: { value: '' },
      })
      const dropdownOptions = screen.getByRole('combobox')
      fireEvent.click(dropdownOptions)
      expect(autocomplete).toHaveValue('')
      const searchButton = screen.getByTestId('search-employee-btn')
      userEvent.click(searchButton)
      await waitFor(() => {
        expect(render(toRender))
      })
    })
  })
  const toRender = (
    <div>
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
      <div id="root"></div>
      <EmployeeList />
    </div>
  )
  describe('should redirect to employeeList page with search string Data', () => {
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
              searchString: 'Raju Sriramoju',
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      )
    })
    jest.retryTimes(3)
    test('should redirect to employeeList page upon clicking the search button with searchString', async () => {
      const autocomplete = screen.getByPlaceholderText(searchPlaceholderText)
      autocomplete.click()
      autocomplete.focus()
      fireEvent.change(autocomplete, {
        target: { value: searchEmployeeString },
      })
      const dropdownOptions = screen.getByRole('combobox')
      fireEvent.click(dropdownOptions)
      expect(autocomplete).toHaveValue(searchEmployeeString)
      const searchButtonElement = screen.getByTestId(searchButton)
      userEvent.click(searchButtonElement)
      await waitFor(() => {
        expect(
          render(toRender, {
            preloadedState: {
              dashboardEmployeeSearch: {
                employeeProfile: mockSearchEmployee,
                searchString: searchEmployeeString,
              },
              userAccessToFeatures: {
                userAccessToFeatures: mockUserAccessToFeaturesData,
              },
            },
          }),
        )
      })
    })
    test('Should be able to function autocomplete on Enter', async () => {
      const searchInput = screen.getByPlaceholderText(searchPlaceholderText)
      userEvent.type(searchInput, 'Sai')
      fireEvent.keyDown(searchInput, { key: 'Enter', keyCode: 13 })
      await waitFor(() => {
        expect(render(toRender))
      })
    })
  })
})
