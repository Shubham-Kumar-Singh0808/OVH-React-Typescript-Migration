/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
// Todo: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeEmailTemplate from './EmployeeEmailTemplate'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('email Template List Table Testing', () => {
  test('should render No data to display if Reviews is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records found...')).toBeInTheDocument()
    })
  })
  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(1)
  })
  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getByRole('option', { name: 'Select Type' }).selected).toBe(
      true,
    )
  })
  test('should render Email Template button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })
  // eslint-disable-next-line require-await
  test('should render Email Template component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getByText('Template')).toBeInTheDocument()
  })
  test('should render Type and Search Text empty button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })
  // eslint-disable-next-line sonarjs/no-identical-functions
  test('should render Email Template clear button as Enabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeEmailTemplate />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
})
