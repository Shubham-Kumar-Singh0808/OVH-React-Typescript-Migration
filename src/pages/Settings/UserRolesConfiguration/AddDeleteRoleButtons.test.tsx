import '@testing-library/jest-dom'

import AddDeleteRoleButtons from './AddDeleteRoleButtons'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { render } from '@testing-library/react'
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
  roleName: 'admin',
  features: null,
}
describe('Add Delete Role Buttons Component Testing', () => {
  test('should render add delete role buttons component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddDeleteRoleButtons
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
  })
})
