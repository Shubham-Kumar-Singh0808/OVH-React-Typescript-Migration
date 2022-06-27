import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeDesignationReportTable from './EmployeeDesignationReportTable'
import { render } from '@testing-library/react'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee Designation Report Table Component Testing', () => {
  test('should render employee designation report table component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeDesignationReportTable
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />
      </ReduxProvider>,
    )
  })
})
