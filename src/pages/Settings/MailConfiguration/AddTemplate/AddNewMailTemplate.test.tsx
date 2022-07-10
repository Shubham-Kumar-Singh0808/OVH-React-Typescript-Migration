import '@testing-library/jest-dom'
import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import AddNewMailTemplate from './AddNewMailTemplate'
import stateStore from '../../../../stateStore'
import { mockTemplateTypes } from '../../../../test/data/addMailTemplateData'
import { reduxServices } from '../../../../reducers/reduxServices'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.queryByText('Type:')).toBeInTheDocument()
  expect(screen.queryByText('Title:')).toBeInTheDocument()
  expect(screen.queryByText('Template:')).toBeInTheDocument()
  expect(screen.getByTestId('btn-save')).toBeDisabled()
  expect(screen.getByTestId('btn-clear')).toBeEnabled()
}

describe('Add Template Component Testing', () => {
  test('should render Add Mail Template Component without crashing', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    expect(screen.getByText('Add Template')).toBeInTheDocument()
  })

  it('should fetch asset types dropdown data and email input field', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
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
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    expect(screen.getByTestId('btn-save')).toBeDisabled()
    expect(screen.getByTestId('btn-clear')).toBeEnabled()
  })

  it('should fetch template types dropdown data', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    screen.debug()
    mockTemplateTypes.forEach(async (type) => {
      await waitFor(() => {
        expect(screen.queryAllByText(type.name)).toBeDefined()
      })
    })
  })

  test('render email input', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    const inputEl = screen.queryByTestId('email-address')
    expect(inputEl).toBeDefined()
  })

  test('pass valid email to test email input field', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    expect(screen.queryByTestId('error-msg')).not.toBeInTheDocument()
  })

  test('pass invalid email to test input value', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    screen.debug()
    expect(screen.queryByTestId('error-msg')).not.toBeTruthy()
  })

  test('should clear input and disable button after submitting ', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    userEvent.type(screen.getByRole('combobox'), '')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /clear/i }))
      expect(screen.getByRole('textbox')).toHaveValue('')
    })
  })
  test('renders the <CKEditor> component ', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    const htmlElement = document.querySelector(
      '[data-testid="ckEditor-component"]',
    )
    const nonExistantElement = document.querySelector('ckEditor-component')

    expect(htmlElement).toBeInTheDocument()
    expect(nonExistantElement).not.toBeInTheDocument()
  })
  test('should fetch Asset types data and put it in the store', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    await stateStore.dispatch(reduxServices.addNewMailTemplate.getAssetTypes())
  })
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
  test('should enabled add button when input is not empty', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )
    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    expect(screen.getByTestId('btn-clear')).not.toBeDisabled()

    userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByTestId('btn-save')).toBeDisabled()
  })
  test('should clear input and disable button after submitting and new template should be added', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByTestId('btn-clear'))

      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByTestId('btn-save')).toBeDisabled()
    })
  })
})
