/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
// Todo: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeReviews from './EmployeeReviews'
import stateStore from '../../../stateStore'
import { mockReviewDetails } from '../../../test/data/employeeReviewsData'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockReviewDetails[i].employeeName),
    ).toBeInTheDocument()
  }
}

describe('Review List Table Testing', () => {
  test('should render No data to display if Reviews is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReviews />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found...')).toBeInTheDocument()
    })
  })

  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeReviews />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
})
