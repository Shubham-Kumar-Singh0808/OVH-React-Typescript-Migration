import '@testing-library/jest-dom'
import React from 'react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'
import FilterOptions from './FilterOptions'
import stateStore from '../../../stateStore'
import { render, screen } from '../../../test/testUtils'
import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Fitler Options Component Testing', () => {
  // eslint-disable-next-line require-await
  test('should render filter options component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <FilterOptions category={''} setCategory={jest.fn()} />
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
  })
})
