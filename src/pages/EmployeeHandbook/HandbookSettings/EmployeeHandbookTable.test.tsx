import '@testing-library/jest-dom'

import { render, screen, waitFor } from '../../../test/testUtils'

import EmployeeHandbookTable from './EmployeeHandbookTable'
import React from 'react'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'
import userEvent from '@testing-library/user-event'
import stateStore from '../../../stateStore'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { EmployeeHandbook } from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

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
      screen.findAllByText(mockEmployeeHandbookList[i].title),
    ).toBeInTheDocument()
  }
}

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

  test('should render Employee Handbook component without crashing', async () => {
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
      {
        preloadedState: {
          employeeHandbookSettings: {
            employeeHandbooks: mockEmployeeHandbookList as EmployeeHandbook[],
            listSize: 23,
          },
        },
      },
    )
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
