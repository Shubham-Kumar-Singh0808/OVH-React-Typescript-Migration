import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import EmployeeHandbookSettings from './EmployeeHandbookSettings'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Handbook Settings Component Testing', () => {
  test('should render Handbook Settings Component without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeHandbookSettings />
      </ReduxProvider>,
    )
    expect(screen.getByText('Handbook Settings')).toBeInTheDocument()
  })
})
