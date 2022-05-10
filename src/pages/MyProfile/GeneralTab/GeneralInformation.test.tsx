import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import GeneralInformation from './GeneralInformation'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore, { useTypedSelector } from '../../../stateStore'
import { EmployeeGeneralInformationStateType } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const initialGeneralInformationState = {} as EmployeeGeneralInformationStateType

const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const expectComponentToBeRendered = () => {
  expect(screen.getByLabelText('Base Location')).toBeInTheDocument()
  expect(screen.getByLabelText('Current Location')).toBeInTheDocument()
  expect(screen.getByLabelText('Current Address')).toBeInTheDocument()
  expect(screen.getByLabelText('Gender')).toBeInTheDocument()
  expect(screen.getByLabelText('Blood Group')).toBeInTheDocument()
  expect(screen.getByLabelText('Date of Birth')).toBeInTheDocument()
  expect(screen.getByLabelText('Marital Status')).toBeInTheDocument()
  expect(screen.getByLabelText('Emergency Contact')).toBeInTheDocument()
}

describe('Employee General Information Testing', () => {
  beforeEach(() => {
    useTypedSelector.arguments((callback: (arg0: any) => any) => {
      return callback(initialGeneralInformationState)
    })
  })
  test('should render General Information data without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <GeneralInformation />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })
})
// function getLoggedInEmployeeData(getLoggedInEmployeeData: any) {
//   throw new Error('Function not implemented.')
// }
