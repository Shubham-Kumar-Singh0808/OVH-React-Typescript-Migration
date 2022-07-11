import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AddNewMailTemplate from './AddNewMailTemplate'
import { mockTemplateTypes } from '../../../../test/data/addMailTemplateData'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import stateStore from '../../../../stateStore'
import { emailAddress, templateType } from '../../../../test/constants'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Template Component Testing', () => {
  describe('without data', () => {
    beforeEach(() => {
      render(<AddNewMailTemplate />)
    })
    test('should render "AddTemplate" title', () => {
      const mailTemplateTitle = screen.getByRole('heading', {
        name: 'Add Template',
      })
      expect(mailTemplateTitle).toBeTruthy()
    })
    test('should render Template Type dropdown', () => {
      expect(templateType).toBeTruthy()
    })
    test('should render title input', () => {
      const title = screen.findByTestId('title-input')
      expect(title).toBeTruthy()
    })
    test('should render Template richtext editor', () => {
      const templateDescription = screen.findByTestId('ckEditor-component')
      expect(templateDescription).toBeTruthy()
    })
  })

  it('should fetch asset types dropdown data and email input field', () => {
    render(<AddNewMailTemplate />)
    screen.debug()
    mockTemplateTypes.forEach(async (type) => {
      await waitFor(() => {
        expect(screen.queryAllByText(type.name)).toBeDefined()
      })
      await waitFor(() => {
        expect(screen.queryByText('Asset Type')).toBeDefined()
        expect(screen.queryByText('Email')).toBeDefined()
      })
    })
  })
  it('should render Add button as enabled and Clear Button as disabled', () => {
    render(<AddNewMailTemplate />)
    expect(screen.getByTestId('btn-save')).toBeDisabled()
    expect(screen.getByTestId('btn-clear')).toBeEnabled()
  })

  test('render email input', () => {
    render(<AddNewMailTemplate />, {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetMailTemplateTypes: mockTemplateTypes,
        },
      },
    })
    userEvent.selectOptions(screen.getByTestId(templateType), '11')
    const inputEl = screen.getByTestId(emailAddress)
    expect(inputEl).toBeInTheDocument()
    expect(inputEl).toHaveAttribute('type', 'email')
  })
  test('pass valid email to test email input field', async () => {
    render(<AddNewMailTemplate />, {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetMailTemplateTypes: mockTemplateTypes,
        },
      },
    })
    userEvent.selectOptions(screen.getByTestId(templateType), '11')
    const inputEl = screen.getByTestId(emailAddress)
    userEvent.type(inputEl, 'test@mail.com')
    await waitFor(() => {
      expect(screen.getByTestId(emailAddress)).toHaveValue('test@mail.com')
      expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
    })
  })

  test('pass invalid email to test input value', async () => {
    render(<AddNewMailTemplate />, {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetMailTemplateTypes: mockTemplateTypes,
        },
      },
    })
    userEvent.selectOptions(screen.getByTestId('form-select-type'), '11')

    const inputEl = screen.getByTestId('email-address')
    userEvent.type(inputEl, 'test')
    await waitFor(() => {
      expect(screen.getByTestId('email-address')).toHaveValue('test')
      expect(screen.queryByTestId('error-msg')).toBeInTheDocument()
      expect(screen.queryByTestId('error-msg')?.textContent).toEqual(
        'Enter a valid Email address.For multiple mail ids use,without space!!',
      )
    })
  })
  test('should clear input and disable button after submitting ', async () => {
    render(<AddNewMailTemplate />)
    userEvent.type(screen.getByRole('combobox'), '')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /clear/i }))
      expect(screen.getByRole('textbox')).toHaveValue('')
    })
  })
  test('renders the <CKEditor> component ', () => {
    render(<AddNewMailTemplate />)
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistantElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistantElement).not.toBeInTheDocument()
  })
  test('should fetch Asset types data and put it in the store', async () => {
    render(<AddNewMailTemplate />)
    await stateStore.dispatch(reduxServices.addNewMailTemplate.getAssetTypes())
  })

  test('should enabled add button when input is not empty', () => {
    render(<AddNewMailTemplate />)
    userEvent.type(screen.getByRole('textbox'), 'testing')
    expect(screen.getByTestId('btn-clear')).not.toBeDisabled()

    userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByTestId('btn-save')).toBeDisabled()
  })
  test('should clear input and disable button after submitting and new template should be added', async () => {
    render(<AddNewMailTemplate />)

    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByTestId('btn-clear'))

      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByTestId('btn-save')).toBeDisabled()
    })
  })
  test('should render template types dropdown without crashing..', async () => {
    render(<AddNewMailTemplate />, {
      preloadedState: {
        employeeMailConfiguration: {
          employeeGetMailTemplateTypes: mockTemplateTypes,
        },
      },
    })
    await waitFor(() => {
      userEvent.selectOptions(screen.getByTestId('form-select-type'), '33')
      expect(screen.getByTestId('title-input')).toBeInTheDocument()
    })
  })

  describe('Page redirection', () => {
    test('should redirect to /mailTemplates when user clicks on Back Button', async () => {
      const history = createMemoryHistory()
      render(
        <Router history={history}>
          <ReduxProvider reduxStore={stateStore}>
            <AddNewMailTemplate />
          </ReduxProvider>
        </Router>,
      )
      userEvent.click(screen.getByRole('button', { name: /Back/i }))
      await waitFor(() => {
        // check if a redirect happens after clicking Back button to Email Templates Page
        expect(history.location.pathname).toBe('/mailTemplates')
      })
    })
  })
})
