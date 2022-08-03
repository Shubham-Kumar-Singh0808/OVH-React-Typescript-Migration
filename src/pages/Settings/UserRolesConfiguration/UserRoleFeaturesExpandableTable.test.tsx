import '@testing-library/jest-dom'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from '@testing-library/react'
import UserRoleFeaturesExpandableTable from './UserRoleFeaturesExpandableTable'
import stateStore from '../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockSelectedRole = {
  roleId: 1,
  name: 'admin',
  features: null,
}

describe('User Role Features Expandable Table Component Testing', () => {
  test('should render user role features expandable table component', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRoleFeaturesExpandableTable
          selectedRoleId={mockSelectedRole.roleId}
        />
      </ReduxProvider>,
    )
  })
})
