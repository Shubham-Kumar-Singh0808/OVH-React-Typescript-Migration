import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import AddNewQualificationCategory from './AddNewQualificationCategory'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add New Qualification Category Testing', () => {
  test('should find add and clear buttons in the form', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Category' }).selected,
    ).toBe(true)
  })

  test('should display the correct number of options, including default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    //including heading
    expect(screen.getAllByRole('option').length).toBe(3)
  })

  it('should allow user to change Options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    userEvent.selectOptions(
      // Find the select element.
      screen.getByRole('combobox'),
      // Find and select the Post Graduation option.
      screen.getByRole('option', { name: 'Post Graduation' }),
    )
    expect(
      screen.getByRole('option', { name: 'Post Graduation' }).selected,
    ).toBe(true)
  })
})
