import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import PersonalInfoTab from './PersonalInfoTab'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { getEmployeeGeneralInformationThunk } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))
describe('Personal Info Tab Testing', () => {
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1985'),
    )
  })
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <PersonalInfoTab />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1985'),
    )
    expect(screen.getByText('Work:')).toBeInTheDocument()
    expect(screen.getByText('Home:')).toBeInTheDocument()
  })
  test('should render PersonalInfoTab button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <PersonalInfoTab />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
