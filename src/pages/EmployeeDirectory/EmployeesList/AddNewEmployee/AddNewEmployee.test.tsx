import '@testing-library/jest-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AddNewEmployee from '.'
import stateStore from '../../../../stateStore'
import { render, screen, waitFor, fireEvent } from '../../../../test/testUtils'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

const clearBtnId = 'clear-new-employee'
const addBtnId = 'add-new-employee'
const userInputId = 'user-input'
let history: any

describe('Add New Employee Testing', () => {
  beforeEach(() => {
    history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewEmployee />
        </ReduxProvider>
      </Router>,
    )
  })

  test('should be able to render Add Family button', () => {
    expect(screen.getByTestId(addBtnId)).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    expect(screen.getByTestId(clearBtnId)).toBeInTheDocument()
  })

  test('should render input components', () => {
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  test('should stay disable add button when input is empty', () => {
    expect(screen.getByTestId(addBtnId)).toBeDisabled()
  })

  test('should enable clear button when input is not empty', () => {
    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
  })

  test('should be able to click clear button when input is not empty', () => {
    const clearBtn = screen.getByTestId(clearBtnId)

    userEvent.type(screen.getByTestId(userInputId), 'test input..')
    expect(screen.getByTestId(clearBtnId)).not.toBeDisabled()
    fireEvent.click(clearBtn)

    expect(screen.getByTestId(userInputId)).toHaveValue('')
  })

  test('should redirect to /employeeList after back button click', async () => {
    const backBtn = screen.getAllByTestId('back-btn')
    userEvent.click(backBtn[0])

    await waitFor(() => {
      expect(history.location.pathname).toBe('/employeeList')
    })
  })

  test('should render "Add New Employee" title', () => {
    expect(screen.getByText('Add New Employee')).toBeInTheDocument()
  })

  test('create new employee', () => {
    // UserNameEmail
    // FullName
    // OSelectList - gender
    // OSelectList - country
    // Birthday
    // JoinedDate
    // Experience
    // OSelectList - department
    // OSelectList - technology
    // Designation
    // OSelectList - role
    // ReportingManager
    // ProjectManager
    // HRAssociate
    // OSelectList - Employment Type
    // OSelectList - Job Type
    // Shift
    // EmploymentContract
    // WorkFrom

    const username = screen.getByTestId(userInputId)
    userEvent.type(username, 'dog')
    expect(username).toHaveValue('dog')

    const firstName = screen.getByPlaceholderText('First Name')
    userEvent.type(firstName, 'Gwapo')
    expect(firstName).toHaveValue('Gwapo')

    const middleName = screen.getByPlaceholderText('Middle Name')
    userEvent.type(middleName, 'Kaayo')
    expect(middleName).toHaveValue('Kaayo')

    const lastName = screen.getByPlaceholderText('Last Name')
    userEvent.type(lastName, 'Ko')
    expect(lastName).toHaveValue('Ko')

    const GenderSelectListSelector = screen.getByTestId('formGender')
    userEvent.selectOptions(GenderSelectListSelector, ['Male'])
    expect(GenderSelectListSelector).toHaveValue('Male')

    // need to fix
    const CountrySelectListSelector = screen.getByTestId('formCountry')
    fireEvent.change(CountrySelectListSelector, { target: { value: 'test' } })

    // Birtday format
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )

    // Join date
    userEvent.type(
      dateInput[1],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
})
