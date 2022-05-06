import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRolesAndPermissions from './UserRolesAndPermissions'
import { render } from '@testing-library/react'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('User Roles And Permissions Testing', () => {
  test('should render user roles and permissions component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
  })
})
