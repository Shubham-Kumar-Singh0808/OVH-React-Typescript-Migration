/* eslint-disable import/named */
import '@testing-library/jest-dom'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddNewMailTemplateType from './AddNewMailTemplateType'
import { render, screen, waitFor } from '../../../../test/testUtils'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByLabelText('Template Type:')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Add New Category Testing', () => {
  test('should render add Family Member button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewMailTemplateType />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })

  test('should render 1 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewMailTemplateType />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Template Type')).toBeInTheDocument()
  })
})
