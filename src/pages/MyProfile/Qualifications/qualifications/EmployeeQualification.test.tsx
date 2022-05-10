import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import EmployeeQualifications from './EmployeeQualification'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
import axiosMock from 'axios'
import { qualificationsApi } from '../../../../middleware/api/apiList'

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
describe('Qualifications Component Testing', () => {
  test('should render Qualifications Data without Crashing...', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeQualifications />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('Post Graduation :')).toBeInTheDocument()
      expect(screen.getByText('Graduation :')).toBeInTheDocument()
      expect(
        screen.getByText('Higher Secondary Education :'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('School Secondary Education :'),
      ).toBeInTheDocument()
      expect(screen.getByText('Others :')).toBeInTheDocument()
    })
  })

  test('should render N/A if there is no qualifications added...', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeQualifications />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getAllByText('N/A')).toHaveLength(5)
    })
  })
  it('Renders with a className equal to text-dark-blue', async () => {
    const { container } = render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeQualifications />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(container.getElementsByClassName('text-dark-blue').length).toBe(5)
    })
  })
})
