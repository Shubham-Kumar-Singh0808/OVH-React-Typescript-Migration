import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import EmployeeLeaveCategories from './EmployeeLeaveCategories'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
describe('Employee Leave Categories Testing', () => {
  render(
    <ReduxProvider reduxStore={stateStore}>
      <EmployeeLeaveCategories />
    </ReduxProvider>,
  )
  test('should render the "Leave Categories" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Leave categories' })
    expect(pageTitle).toBeTruthy()
  })

  test('should render No data to display if Leave Categories is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records found')).toBeInTheDocument()
    })
  })
  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })

  test('should render Leave Categories component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeLeaveCategories />
      </ReduxProvider>,
    )
    expect(screen.getByText('Category')).toBeInTheDocument()
  })
})
