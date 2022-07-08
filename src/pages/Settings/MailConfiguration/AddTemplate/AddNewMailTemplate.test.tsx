import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
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

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

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
  it('Check entire flow', async () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewMailTemplate />
        </ReduxProvider>
      </Router>,
    )

    // CHECK IF SELECT DROPDOWN EXISTS
    const selectDropdown = await waitFor(
      () => screen.getByTestId('form-select-type'),
      {
        timeout: 3000,
      },
    )
    expect(selectDropdown).toBeInTheDocument()

    //"option2" is the element in the select dropdown list
    userEvent.selectOptions(screen.getByTestId('form-select-type'), [
      'Select Type',
    ])
  })
})
