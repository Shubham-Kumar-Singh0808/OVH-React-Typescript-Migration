import '@testing-library/jest-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from '@testing-library/react'
import EmployeeDesignationReportTable from './EmployeeDesignationReportTable'
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
  // eslint-disable-next-line require-await
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
