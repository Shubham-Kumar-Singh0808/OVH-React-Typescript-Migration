import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import EmployeeReportees from './EmployeeReportees'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Reportees Table Testing', () => {
  test('should render No data to display if Reviews is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReportees />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records found')).toBeInTheDocument()
    })
  })

  test('should render', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReportees />
      </ReduxProvider>,
    )
    expect(screen.getByText('Manager')).toBeInTheDocument()
  })
})
