import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import BasicInfoTab from './BasicInfoTab'
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

describe('Basic Info Tab Testing', () => {
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1978'),
    )
  })
  test('should render basic info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTab />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation('1978'),
    )
    expect(screen.getByText('Employee ID:')).toBeInTheDocument()
    expect(screen.getByText('INDIA')).toBeInTheDocument()
  })
})
