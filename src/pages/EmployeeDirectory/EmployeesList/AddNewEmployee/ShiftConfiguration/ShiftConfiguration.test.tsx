/* eslint-disable import/named */
// Todo: remove eslint and fix error
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ShiftConfiguration from './ShiftConfiguration'
import stateStore from '../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Shift Configuration Component Testing', () => {
  test('should render shift configuration component', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Shift Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should create employee shift upon add button click', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    userEvent.type(screen.getByPlaceholderText('Shift Name'), 'Canada Shift')
    userEvent.type(screen.getByTestId('sh-startTimeHour'), '45')
    userEvent.type(screen.getByTestId('sh-startTimeMinutes'), '45')
    userEvent.type(screen.getByTestId('sh-endTimeHour'), '2')
    userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '99')
    userEvent.type(screen.getByPlaceholderText('In Minutes'), '30')
    userEvent.click(screen.getByText('Add'))
  })
})
