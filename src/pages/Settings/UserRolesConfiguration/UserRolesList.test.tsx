import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRolesList from './UserRolesList'
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

// const selectOption = (role: mockRole) => {
//   const selectElement = screen.getByTestId('form-select')
//     const optionElement = screen.queryAllByText('option', { role })
//   userEvent.selectOptions(selectElement, [role.roleId as string])
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
  //     expect(
  //       screen.getByRole('option', { name: mockRole.roleName }),
  //     ).toBeVisible()
  //     expect(
  //       screen.getByRole('option', { name: mockRole.roleName }),
  //     ).toHaveTextContent(mockRole.roleName)
  //   })
  // })
})
