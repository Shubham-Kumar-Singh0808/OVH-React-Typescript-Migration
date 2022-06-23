import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import stateStore from '../../../stateStore'
import EmployeeProjectsDetail from './EmployeeProjectsDetails'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1983
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

describe('Employee Projects Details', () => {
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsDetail projectId={88} />
      </ReduxProvider>,
    )
  })
  test('should render the "Projec Details" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByTestId('project-loader')).toBeTruthy()
  })
})
