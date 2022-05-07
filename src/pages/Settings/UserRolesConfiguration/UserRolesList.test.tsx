import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { UserRole } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import UserRolesList from './UserRolesList'
import { mockUserRoles } from '../../../test/data/userRolesData'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

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

// const selectOption = (role: UserRole) => {
//   const selectElement = screen.getByTestId('form-select')
//   const optionElement = screen.queryAllByText('option',  {role.name} )
//   userEvent.selectOptions(selectElement, optionElement)
// }
describe('User Roles List Testing', () => {
  test('should render select element', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesList
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Role:')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
  })
  // it('should show selected value in the select element', () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <UserRolesList
  //         selectedRole={mockSelectedRole}
  //         setSelectedRole={jest.fn()}
  //       />
  //     </ReduxProvider>,
  //   )
  //   mockUserRoles.forEach((mockRole) => {
  //     selectOption(mockRole)
  //     expect(screen.getByRole('option', { name: mockRole.name })).toBeVisible()
  //     expect(
  //       screen.getByRole('option', { name: mockRole.name }),
  //     ).toHaveTextContent(mockRole.name)
  //   })
  // })
})
