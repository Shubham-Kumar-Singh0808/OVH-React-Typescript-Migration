import * as reactRedux from 'react-redux'

import { EnhancedStore, Store } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import { render, screen } from '@testing-library/react'

import ProfileDetails from './ProfileDetails'
import { ProfileDetailsMockData } from '../../../middleware/ProfileDetailsData'
import React from 'react'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

test('should render Sidebar menu without crashing', () => {
  //   mockUseLocationValue.pathname = '/dashboard'
  // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
  render(
    <ReduxProvider reduxStore={stateStore}>
      <ProfileDetails employeeGeneralInformation={ProfileDetailsMockData} />
    </ReduxProvider>,
  )
  screen.debug()
  expect(screen.getByText('Employee Id')).toBeInTheDocument()
})
