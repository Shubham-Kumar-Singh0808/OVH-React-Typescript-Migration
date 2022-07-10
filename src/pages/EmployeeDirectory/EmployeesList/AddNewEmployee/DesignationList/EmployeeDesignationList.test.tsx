/* eslint-disable import/named */
// Todd: remove eslint and fix error
import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeDesignationList from './EmployeeDesignationList'
import EmployeeDesignationListTable from './EmployeeDesignationListTable'
import stateStore from '../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('DesignationList Table Testing', () => {
  test('should render Designation List without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeDesignationList
          setToggleDesignation={function (value: boolean): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Designation List')).toBeInTheDocument()
  })
  test('should render No Records Found if designations is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeDesignationListTable selectedDepartmentId={4} />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.queryByText('No Records Found')).toBeInTheDocument()
    })
  })
})
