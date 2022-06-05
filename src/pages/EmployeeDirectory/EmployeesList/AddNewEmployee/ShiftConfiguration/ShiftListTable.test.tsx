import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ShiftListTable from './ShiftListTable'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'
import stateStore from '../../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Shift List Table Component Testing', () => {
  test('should render shift list table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockEmployeeShifts.forEach((employeeShift) => {
      expect(screen.getByText(employeeShift.name as string)).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(6)
      // 6 including the heading row
      expect(screen.getAllByRole('row')).toHaveLength(
        mockEmployeeShifts.length + 1,
      )
    })
  })
  test('should delete employee shift detail upon delete modal confirm button click', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
  })
})
