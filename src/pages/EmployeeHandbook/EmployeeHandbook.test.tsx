import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EmployeeHandbook from './EmployeeHandbook'
import { render, screen } from '../../test/testUtils'
import { mockHandbookList } from '../../test/data/handbookListData'
import { mockUserAccessToFeaturesData } from '../../test/data/userAccessToFeaturesData'

const history = createMemoryHistory()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <EmployeeHandbook />
    </Router>
  </div>
)
const searchButton = 'search-handbook'
describe('Employee Handbook Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'admin',
            employeeId: '1983',
            userName: 'admin',
            role: 'admin' || 'HR Manager' || 'HR',
            tenantKey: 'abc',
            token: 'test',
            designation: 'developer',
          },
        },
        EmployeeHandbook: {
          handbooksList: mockHandbookList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render `Employee Handbook` component without crashing', () => {
    expect(screen.getByText('Employee Handbook')).toBeInTheDocument()
  })
  test('should render search button', () => {
    const searchButtonEl = screen.getByTestId(searchButton)
    expect(searchButtonEl).toBeTruthy()
  })
  test('should click search button', () => {
    const handbookInputEl = screen.getByPlaceholderText('Search Handbook')
    userEvent.type(handbookInputEl, 'xyz')
    expect(handbookInputEl).toHaveValue('xyz')
    const searchBtn = screen.getByTestId(searchButton)
    userEvent.click(searchBtn)
  })
  test('should redirect to handbookSettings page upon clicking handbooksettings button from Employee Handbook Page', () => {
    const handbookSettingsBtn = screen.getByTestId('handbook-settings-btn')
    userEvent.click(handbookSettingsBtn)
    expect(history.location.pathname).toBe('/handbooksettings')
  })
})
