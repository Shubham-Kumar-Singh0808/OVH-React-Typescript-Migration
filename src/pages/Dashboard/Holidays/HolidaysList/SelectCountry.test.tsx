import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import SelectCountry from './SelectCountry'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { mockCountries } from '../../../../test/data/handbookTotalListData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

describe('Select Country Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <SelectCountry selectedCountry={''} setSelectedCountry={jest.fn()} />
      </Router>,
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeCountries: mockCountries,
          },
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })
  screen.debug()
  test('should render countries select option, with list of countries', () => {
    expect(screen.getByText('AUSTRALIA')).toBeInTheDocument()
    expect(screen.getByText('INDIA')).toBeInTheDocument()
    expect(screen.getByText('USA')).toBeInTheDocument()
    expect(screen.getByText('CANADA')).toBeInTheDocument()
    expect(screen.getByText('PHILIPPINES')).toBeInTheDocument()
  })

  test('should redirect to /dashboard when user clicks on Back Button from HolidaysList Page', async () => {
    userEvent.click(screen.getByRole('button', { name: /Back/i }))
    await waitFor(() => {
      // check if a redirect happens after clicking Back button to Dashboard Page
      expect(history.location.pathname).toBe('/dashboard')
    })
  })

  test('should redirect to /addHoliday Page when user clicks on Add Button from HolidaysList Page', async () => {
    userEvent.click(screen.getByRole('button', { name: /Add/i }))
    await waitFor(() => {
      // check if a redirect happens after clicking Back button to Dashboard Page
      expect(history.location.pathname).toBe('/addHoliday')
    })
  })
})
