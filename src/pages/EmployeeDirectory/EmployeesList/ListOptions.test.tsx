/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
// Todd: remove eslint and fix error
// Todo: remove eslint and fix all the errors
import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ListOptions from './ListOptions'
import { render, screen } from '../../../test/testUtils'
import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { ReduxProvider } from '../../../components/Helper'
import stateStore from '../../../stateStore'

const mockSetPageSize = jest.fn()
describe('List Options Component Testing', () => {
  test('should render Personal info tab component with out crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ListOptions
          userCreateAccess={true}
          userViewAccess={true}
          setCurrentPage={mockSetPageSize}
          setPageSize={mockSetPageSize}
        />
      </ReduxProvider>,
    )

    const activeRadio = screen.getByRole('radio', {
      name: EmploymentStatus.active,
    }) as HTMLInputElement

    expect(activeRadio.checked).toEqual(true)

    const inactiveRadio = screen.getByRole('radio', {
      name: 'Inactive',
    }) as HTMLInputElement

    userEvent.click(inactiveRadio)

    expect(activeRadio.checked).toEqual(false)
    expect(inactiveRadio.checked).toEqual(true)

    const exportBtn = screen.getByTestId('employee-export-btn')
    userEvent.click(exportBtn)
  })
})
