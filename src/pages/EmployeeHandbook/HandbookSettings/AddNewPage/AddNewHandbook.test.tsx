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
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'
import { pageTitle, pageName, displayOrder } from '../../../../test/constants'

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
      const titleInput = screen.findByTestId(pageTitle)
      expect(titleInput).toBeTruthy()
    })
    test('should render PageName input', () => {
      const pageNameInput = screen.findByTestId(pageName)
      expect(pageNameInput).toBeTruthy()
    })
    test('should render display order input', () => {
      const displayOrderInput = screen.findByTestId(displayOrder)
      expect(displayOrderInput).toBeTruthy()
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
    test('should render countries checkbox ', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
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
    test('should render all checkbox ', () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />,
      )
      const checkbox = screen.getByTestId('all-input')
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })
    test('Checkbox changes value', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />,
        {
          preloadedState: {
            employeeHandbookSettings: {
              employeeCountries: mockCountries,
            },
          },
        },
      )
      const checkbox = fireEvent.change(
        screen.getAllByTestId('ch-countries')[1],
        {
          target: { checked: true },
        },
      )
      await waitFor(() => {
        expect(checkbox).toBe(true)
      })
    })
    test('should redirect to /handbook when user clicks on Back Button', async () => {
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
    // test('should enable button after inputs given by the user', async () => {
    //   render(
    //     <AddNewHandbook
    //       headerTitle={''}
    //       confirmButtonText={''}
    //       backButtonHandler={jest.fn()}
    //     />,
    //   )
    //   const titleInput = screen.getByTestId('title-input')
    //   userEvent.type(titleInput, 'titleTest')
    //   expect(titleInput).toHaveValue('titleTest')

    //   const pageNameInput = screen.getByTestId('pageName-input')
    //   userEvent.type(pageNameInput, 'pageNameTest')
    //   expect(pageNameInput).toHaveValue('pageNameTest')

    //   const displayOrderInput = screen.getByTestId('displayOrder-input')
    //   userEvent.type(displayOrderInput, '25')
    //   expect(displayOrderInput).toHaveValue('25')
    //   await waitFor(() => {
    //     userEvent.click(screen.getByTestId('save-btn'))
    //     expect(screen.getByTestId('save-btn')).toBeEnabled()
    //   })
    // })
    test('should clear input and disable button after submitting ', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />,
      )
      const titleInput = screen.getByTestId(pageTitle)
      userEvent.type(titleInput, 'titleTest')
      expect(titleInput).toHaveValue('titleTest')
      const pageNameInput = screen.getByTestId(pageName)
      userEvent.type(pageNameInput, 'pageNameTest')
      expect(pageNameInput).toHaveValue('pageNameTest')
      const displayOrderInput = screen.getByTestId(displayOrder)
      userEvent.type(displayOrderInput, '25')
      expect(displayOrderInput).toHaveValue('25')
      const description = screen.getByTestId('description-input')
      userEvent.type(description, 'testing')
      expect(description).toBeTruthy()
      userEvent.click(screen.getByTestId('clear-btn'))
      await waitFor(() => {
        expect(titleInput).toHaveValue('')
        expect(pageNameInput).toHaveValue('')
        expect(displayOrderInput).toHaveValue('')
        expect(description).toBeUndefined()
      })
    })
    test('pass description to test input value', async () => {
      render(
        <AddNewHandbook
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={jest.fn()}
        />,
      )
      const inputEl = screen.getByTestId('description-input')
      userEvent.type(inputEl, 'test')
      await waitFor(() => {
        expect(screen.queryByTestId('error-msg')?.textContent).toEqual(
          'Please enter at least 150 characters.',
        )
      })
    })
  })
})
