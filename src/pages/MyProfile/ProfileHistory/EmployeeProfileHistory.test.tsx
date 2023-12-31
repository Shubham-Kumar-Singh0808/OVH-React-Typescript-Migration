/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/named */
// Todd: remove eslint and fix error
// Todo: remove eslint and fix all the errors
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import EmployeeProfileHistory from './EmployeeProfileHistory'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { ProfileUpdateData } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { mockEmployeeProfileHistoryData } from '../../../test/data/mockEmployeeProfileHistoryData'
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

describe('Testing Profile History Tab', () => {
  test('should render Profile History without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProfileHistory />
      </ReduxProvider>,
    )
    screen.debug()
    expect(screen.getByText('Employee Profile History')).toBeInTheDocument()
  })
  test('should have Time Stamp', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ProfileHistoryTimeLine
          employeeProfileHistory={mockEmployeeProfileHistoryData}
        />
      </ReduxProvider>,
    )
    screen.debug()

    mockEmployeeProfileHistoryData.forEach((childFeature) => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(
        screen.getByText(childFeature.modifiedDate as string),
      ).toBeInTheDocument()
      expect(timeStamp).toHaveLength(mockEmployeeProfileHistoryData.length)
    })
  })
})
