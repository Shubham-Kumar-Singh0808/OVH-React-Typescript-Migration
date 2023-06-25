import React from 'react'
import userEvent from '@testing-library/user-event'
import UserRolesConfiguration from './UserRolesConfiguration'
import {
  getUserRolesConfigTestId,
  initialUserRole,
  initialUserRoleConfigurationModal,
} from './UserRolesConfigurationsHelpers'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockIncomingUserRolesList } from '../../../test/data/userRolesConfigurationData'

const toRender = <UserRolesConfiguration />

describe('User Roles Configuration', () => {
  describe('initial render - no role selected', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          userRolesConfiguration: {
            roles: mockIncomingUserRolesList,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            configurationModal: initialUserRoleConfigurationModal,
            selectedRole: initialUserRole,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('correct number of roles rendered', () => {
      // includes the default value
      expect(
        screen.getAllByTestId(getUserRolesConfigTestId('roleOptions')),
      ).toHaveLength(mockIncomingUserRolesList.length + 1)
    })
    test('select role', () => {
      // choosing employee role
      const chosenOption = mockIncomingUserRolesList[1].roleId.toString()
      const selectOption = screen.getByTestId(
        getUserRolesConfigTestId('roleSelect'),
      )
      expect(selectOption).toHaveValue(initialUserRole.roleId.toString())
      act(() => {
        userEvent.selectOptions(selectOption, chosenOption)
      })
      expect(selectOption).toHaveValue(chosenOption)
    })
    test('add Role Button', () => {
      const addBtn = screen.getByTestId(getUserRolesConfigTestId('addRoleBtn'))
      expect(addBtn).toBeEnabled()
      act(() => {
        userEvent.click(addBtn)
      })
      const newRoleInput = screen.getByTestId(
        getUserRolesConfigTestId('newRoleInput'),
      )
      const reportingManagerFlag = screen.getByTestId(
        getUserRolesConfigTestId('reportingManagerFlag'),
      ) as HTMLInputElement
      const submitBtn = screen.getByTestId('modalConfirmBtn')

      expect(submitBtn).toBeDisabled()

      expect(newRoleInput).toHaveValue('')
      act(() => {
        fireEvent.change(newRoleInput, { target: { value: 'test' } })
      })
      expect(newRoleInput).toHaveValue('test')
      expect(submitBtn).toBeEnabled()

      expect(reportingManagerFlag.checked).toBe(false)
      act(() => {
        userEvent.click(reportingManagerFlag)
      })
      expect(reportingManagerFlag.checked).toBe(true)

      act(() => {
        userEvent.click(submitBtn)
      })
    })
    test('delete role button functionality', () => {
      const chosenOption = mockIncomingUserRolesList[1]
      const selectOption = screen.getByTestId(
        getUserRolesConfigTestId('roleSelect'),
      )
      const deleteRoleBtn = screen.getByTestId(
        getUserRolesConfigTestId('deleteRoleBtn'),
      )
      // initially disabled
      expect(deleteRoleBtn).toBeDisabled()

      act(() => {
        userEvent.selectOptions(selectOption, chosenOption.roleId.toString())
      })

      expect(deleteRoleBtn).toBeEnabled()

      act(() => {
        userEvent.click(deleteRoleBtn)
      })

      expect(
        screen.getByText(
          `Are you sure you want to delete this ${chosenOption.name} role?`,
        ),
      ).toBeVisible()

      const modalConfirmBtn = screen.getByTestId('modalConfirmBtn')
      expect(modalConfirmBtn).toBeEnabled()
      act(() => {
        userEvent.click(modalConfirmBtn)
      })
    })
  })
})
