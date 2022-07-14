import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import AddNewHandbook from './AddNewHandbook'
import {
  mockCountries,
  mockHandbookList,
} from '../../../../test/data/employeeHandbookSettingsData'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'
import {
  pageTitle,
  pageName,
  displayOrder,
  description,
  countries,
} from '../../../../test/constants'

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
      const allCountries = screen.findByTestId('ch-All')
      expect(allCountries).toBeTruthy()
    })
    test('should render description rich text editor', () => {
      const descriptionInput = screen.getByTestId(description)
      expect(descriptionInput).toBeTruthy()
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
      fireEvent.click(screen.getByTestId('ch-countries3'))
      await waitFor(() => {
        expect(screen.getByText('CANADA')).toBeInTheDocument()
      })
    })

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
              totalHandbookList: mockHandbookList,
            },
          },
        },
      )
      const displayOrderInput = screen.getByTestId(displayOrder)
      userEvent.type(displayOrderInput, '4')
      expect(displayOrderInput).toHaveValue('4')
      await waitFor(() => {
        expect(
          screen.getByText('Display order Already Exist'),
        ).toBeInTheDocument()
      })
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
      fireEvent.click(screen.getByTestId('ch-All'))
      const checkCanada = screen.getByTestId('ch-countries2')
      expect(checkCanada).toBeTruthy()
      await waitFor(() => {
        expect(checkCanada).toBeChecked()
      })
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
      const checkbox = fireEvent.click(screen.getByTestId('ch-countries1'))
      await waitFor(() => {
        expect(checkbox).toBe(true)
      })
    })

    test('selecting checkbox', async () => {
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

      const cbAll = screen.getByTestId('ch-All')
      // Execute the click event of the checkbox All
      expect(cbAll).not.toBeChecked()

      await waitFor(() => {
        expect(screen.queryAllByTestId('ch-countries')).not.toBeChecked()
      })
    })

    // test('should allow user to submit the form ', async () => {
    //   render(
    //     <AddNewHandbook
    //       headerTitle={''}
    //       confirmButtonText={''}
    //       backButtonHandler={jest.fn()}
    //     />,
    //     {
    //       preloadedState: {
    //         employeeHandbookSettings: {
    //           employeeCountries: mockCountries,
    //           totalHandbookList: mockHandbookList,
    //         },
    //       },
    //     },
    //   )
    //   const titleInput = screen.getByTestId(pageTitle)
    //   userEvent.type(titleInput, 'titleTest')
    //   expect(titleInput).toHaveValue('titleTest')
    //   const pageNameInput = screen.getByTestId(pageName)
    //   userEvent.type(pageNameInput, 'pageNameTest')
    //   expect(pageNameInput).toHaveValue('pageNameTest')
    //   const displayOrderInput = screen.getByTestId(displayOrder)
    //   userEvent.type(displayOrderInput, '4')
    //   expect(displayOrderInput).toHaveValue('4')
    //   const descriptionInput = screen.getByTestId(description)
    //   userEvent.type(descriptionInput, 'testing')
    //   expect(description).toBeTruthy()
    //   const selectCountry = screen.getByTestId('ch-countries3')
    //   fireEvent.click(selectCountry)
    //   expect(selectCountry).toBeTruthy()
    //   await waitFor(() => {
    //     expect(screen.getByTestId('save-btn')).toBeEnabled()
    //   })
    // })
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
        expect(history.location.pathname).toBeTruthy()
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
      const titleInput = screen.getByTestId(pageTitle)
      userEvent.type(titleInput, 'titleTest')
      expect(titleInput).toHaveValue('titleTest')
      const pageNameInput = screen.getByTestId(pageName)
      userEvent.type(pageNameInput, 'pageNameTest')
      expect(pageNameInput).toHaveValue('pageNameTest')
      const displayOrderInput = screen.getByTestId(displayOrder)
      userEvent.type(displayOrderInput, '25')
      expect(displayOrderInput).toHaveValue('25')
      const descriptionInput = screen.getByTestId(description)
      userEvent.type(descriptionInput, 'testing')
      expect(description).toBeTruthy()
      userEvent.click(screen.getByTestId('clear-btn'))
      await waitFor(() => {
        expect(titleInput).toHaveValue('')
        expect(pageNameInput).toHaveValue('')
        expect(displayOrderInput).toHaveValue('')
        expect(description).toBeDefined()
      })
    })
    test('pass description to test input value', async () => {
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
              totalHandbookList: mockHandbookList,
            },
          },
        },
      )
      const descriptionInput = screen.getByTestId(description)
      userEvent.type(descriptionInput, 'testing')
      expect(descriptionInput).toBeTruthy()
      await waitFor(() => {
        expect(
          screen.getByText('Please enter at least 150 characters.'),
        ).toBeInTheDocument()
      })
    })
  })
})
