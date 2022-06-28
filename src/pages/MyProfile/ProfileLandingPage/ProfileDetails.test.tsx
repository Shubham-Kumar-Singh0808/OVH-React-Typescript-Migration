import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ProfileDetails from './ProfileDetails'
import { ProfileDetailsMockData } from '../../../middleware/ProfileDetailsData'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

test('should render Sidebar menu without crashing', () => {
  render(
    <ReduxProvider reduxStore={stateStore}>
      <ProfileDetails employeeGeneralInformation={ProfileDetailsMockData} />
    </ReduxProvider>,
  )
  screen.debug()
  expect(screen.getByText('Employee Id')).toBeInTheDocument()
})
