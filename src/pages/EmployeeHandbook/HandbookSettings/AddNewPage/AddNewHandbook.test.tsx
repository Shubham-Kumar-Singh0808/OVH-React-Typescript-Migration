import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import AddNewHandbook from './AddNewHandbook'
import { mockCountries } from '../../../../test/data/employeeHandbookSettingsData'
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add New Page Component Testing', () => {
  describe('Without data', () => {
    beforeEach(() => {
      render(
        <AddNewHandbook
          headerTitle="Add New Page"
          confirmButtonText="Save"
          backButtonHandler={jest.fn()}
        />,
      )
    })
    test('should render "Add New Page" Heading', () => {
      const addNewPage = screen.getByRole('heading', {
        name: 'Add New Page',
      })
      expect(addNewPage).toBeTruthy()
    })
    test('should render title input', () => {
      const titleInput = screen.findByTestId('title-input')
      expect(titleInput).toBeTruthy()
    })
    test('should render PageName input', () => {
      const pageNameInput = screen.findByTestId('pagename-input')
      expect(pageNameInput).toBeTruthy()
    })
    test('should render display order input', () => {
      const displayOrder = screen.findByTestId('displayOrder-input')
      expect(displayOrder).toBeTruthy()
    })
    test('should render All countries checkbox', () => {
      const allCountries = screen.findByTestId('all-input')
      expect(allCountries).toBeTruthy()
    })
    test('should render description rich text editor', () => {
      const description = screen.getByTestId('description-input')
      expect(description).toBeTruthy()
    })
    test('should have add button disabled initially', () => {
      const saveButton = screen.getByTestId('save-btn')
      expect(saveButton).toBeDisabled()
    })
    test('should render clear button', () => {
      const clearButton = screen.getByTestId('clear-btn')
      expect(clearButton).toBeEnabled()
    })
  })
  describe('Add New Handbook testing', () => {
    test('Without data', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
            },
          },
        },
      )
      fireEvent.click(screen.getAllByTestId('ch-countries')[1])
      await waitFor(() => {
        expect(screen.getByText('AUSTRALIA')).toBeInTheDocument()
      })
    })
    test('should redirect to /mailTemplates when user clicks on Back Button', async () => {
      const history = createMemoryHistory()
      render(
        <Router history={history}>
          <ReduxProvider reduxStore={stateStore}>
            <AddNewHandbook
              headerTitle={''}
              confirmButtonText={''}
              backButtonHandler={jest.fn()}
            />
          </ReduxProvider>
        </Router>,
      )
      userEvent.click(screen.getByRole('button', { name: /Back/i }))
      await waitFor(() => {
        // check if a redirect happens after clicking Back button to handbook settings Page
        expect(history.location.pathname).toBe('/')
      })
    })
    test('should clear input and disable button after submitting ', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />,
      )
      const titleInput = screen.getByTestId('title-input')
      userEvent.type(titleInput, 'titleTest')
      expect(titleInput).toHaveValue('titleTest')

      const pageNameInput = screen.getByTestId('pagename-input')
      userEvent.type(pageNameInput, 'pageNameTest')
      expect(pageNameInput).toHaveValue('pageNameTest')

      const displayOrder = screen.getByTestId('displayOrder-input')
      userEvent.type(displayOrder, '25')
      expect(displayOrder).toHaveValue('25')
      await waitFor(() => {
        userEvent.click(screen.getByTestId('clear-btn'))
        expect(titleInput).toHaveValue('')
        expect(pageNameInput).toHaveValue('')
        expect(displayOrder).toHaveValue('')
      })
    })
  })
})
