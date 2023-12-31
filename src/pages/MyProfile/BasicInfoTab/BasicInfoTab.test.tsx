// Todd: remove eslint and fix error
import '@testing-library/jest-dom'
import { queryByAttribute, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import BasicInfoTab from './BasicInfoTab'
import { getEmployeeGeneralInformationThunk } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import stateStore from '../../../stateStore'

const history = createMemoryHistory()

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => (
  <Router history={history}>
    <Provider store={reduxStore}>{children}</Provider>
  </Router>
)

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
  test('should render all field', () => {
    const getById = queryByAttribute.bind(null, 'id')

    const component = render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTab />
      </ReduxProvider>,
    )
    const officialBday = getById(
      component.container,
      'employeeOfficialBirthday',
    )
    expect(officialBday).toBeTruthy()

    const realBirthday = getById(component.container, 'employeeRealBirthday')
    expect(realBirthday).toBeTruthy()
  })
  test('should render a file upload field', () => {
    const getById = queryByAttribute.bind(null, 'id')

    const component = render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTab />
      </ReduxProvider>,
    )
    const uploadField = getById(component.container, 'uploadRBTCV')

    expect(uploadField).toBeTruthy()
  })
})
