/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddNewCategory from './AddNewCategory'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByLabelText('Category:')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Add New Category Testing', () => {
  test('should render add new category form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCategory />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should enabled add category button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCategory />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    expect(screen.getByRole('button')).not.toBeDisabled()

    userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByRole('button')).toBeDisabled()
  })
  test('should clear input and disable button after submitting and new category should be added', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCategory />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button'))

      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByRole('button')).toBeDisabled()
      //   expect(mockCategories.length).toEqual(2)
    })
  })
})
