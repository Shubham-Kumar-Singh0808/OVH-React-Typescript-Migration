import '@testing-library/jest-dom'
import React from 'react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import EmployeeHandbookTable from './EmployeeHandbookTable'
import stateStore from '../../../stateStore'
import { render, screen, waitFor } from '../../../test/testUtils'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Handbook List Table Component Testing', () => {
  test('should render no data to display if table is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
        />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.queryByText('No data to display')).toBeInTheDocument()
    })
  })

  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeHandbookTable
          setCurrentPage={mockSetCurrentPage}
          setPageSize={mockSetPageSize}
          currentPage={1}
          pageSize={20}
          paginationRange={[1, 2, 3]}
        />
      </ReduxProvider>,
    )
    await waitFor(() => {
      // 21 including the heading
      expect(screen.queryAllByRole('row')).toHaveLength(0)
    })
  })
})
