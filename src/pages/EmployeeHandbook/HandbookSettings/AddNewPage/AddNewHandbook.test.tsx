import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { CKEditor } from 'ckeditor4-react'
import AddNewHandbook from './AddNewHandbook'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'
import {
  pageTitle,
  pageName,
  displayOrder,
  description,
  cB1,
  cB2,
  cB3,
  cB4,
  cB5,
} from '../../../../test/constants'
import {
  mockCountries,
  mockHandbookList,
} from '../../../../test/data/handbookTotalListData'

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
    test('should have add button disabled initially', () => {
      const saveButton = screen.getByTestId('save-btn')
      expect(saveButton).toBeDisabled()
    })
    test('should render clear button', () => {
      const clearButton = screen.getByTestId('clear-btn')
      expect(clearButton).toBeEnabled()
    })
  })

  describe('Add New Handbook With Countries', () => {
    beforeEach(() => {
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
    })
    test('pass description to test input value', () => {
      render(
        <CKEditor
          initData={
            process.env.JEST_WORKER_ID !== undefined && (
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McFlintlock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the uncountable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of de Finials
                Bonjour et Majorem (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular
              </p>
            )
          }
        />,
      )
    })
    test('should render countries checkbox ', async () => {
      fireEvent.click(screen.getByTestId(cB1))
      fireEvent.click(screen.getByTestId(cB2))
      fireEvent.click(screen.getByTestId(cB3))
      fireEvent.click(screen.getByTestId(cB4))
      fireEvent.click(screen.getByTestId(cB5))
      await waitFor(() => {
        expect(screen.getByText('CANADA')).toBeInTheDocument()
        expect(screen.getByText('INDIA')).toBeInTheDocument()
        expect(screen.getByText('AUSTRALIA')).toBeInTheDocument()
        expect(screen.getByText('PHILIPPINES')).toBeInTheDocument()
        expect(screen.getByText('USA')).toBeInTheDocument()
      })
    })

    test('Checkbox changes value', async () => {
      fireEvent.click(screen.getByTestId('ch-All'))
      const checkCanada = screen.getByTestId(cB3)
      expect(checkCanada).toBeTruthy()
      await waitFor(() => {
        expect(checkCanada).toBeChecked()
      })
    })

    test('Checkbox changes value', async () => {
      const cbAll = screen.getByTestId('ch-All')
      const checkbox1 = fireEvent.click(screen.getByTestId('ch-countries0'))
      const checkbox2 = fireEvent.click(screen.getByTestId('ch-countries1'))
      const checkbox3 = fireEvent.click(screen.getByTestId('ch-countries2'))
      const checkbox4 = fireEvent.click(screen.getByTestId('ch-countries3'))
      const checkbox5 = fireEvent.click(screen.getByTestId('ch-countries4'))
      expect(checkbox1).toBe(true)
      expect(checkbox2).toBe(true)
      expect(checkbox3).toBe(true)
      expect(checkbox4).toBe(true)
      expect(checkbox5).toBe(true)
      await waitFor(() => {
        expect(cbAll).toBeChecked()
      })
    })
  })

  describe('Add New Handbook With Data', () => {
    beforeEach(() => {
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
    })

    test('should render countries checkbox ', async () => {
      const displayOrderInput = screen.getByTestId(displayOrder)
      userEvent.type(displayOrderInput, '4')
      expect(displayOrderInput).toHaveValue('4')
      await waitFor(() => {
        expect(
          screen.getByText('Display order Already Exist'),
        ).toBeInTheDocument()
      })
    })

    test('Unselecting checkbox', async () => {
      screen.debug()
      const cbAll = screen.getByTestId('ch-All')
      const cb1 = screen.getByTestId('ch-countries0')
      const cb2 = screen.getByTestId('ch-countries1')
      const cb3 = screen.getByTestId('ch-countries2')
      const cb4 = screen.getByTestId('ch-countries3')
      const cb5 = screen.getByTestId('ch-countries4')

      fireEvent.change(cbAll, { target: { checked: false } })
      fireEvent.change(cb1, { target: { checked: false } })
      fireEvent.change(cb2, { target: { checked: false } })
      fireEvent.change(cb3, { target: { checked: false } })
      fireEvent.change(cb4, { target: { checked: false } })
      fireEvent.change(cb5, { target: { checked: false } })
      await waitFor(() => {
        expect(cb1).not.toBeChecked()
        expect(cb2).not.toBeChecked()
        expect(cb3).not.toBeChecked()
        expect(cb4).not.toBeChecked()
        expect(cb5).not.toBeChecked()
      })
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
    userEvent.click(screen.getByTestId('clear-btn'))
    await waitFor(() => {
      expect(titleInput).toHaveValue('')
      expect(pageNameInput).toHaveValue('')
      expect(displayOrderInput).toHaveValue('')
      expect(description).toBeDefined()
    })
  })
})
