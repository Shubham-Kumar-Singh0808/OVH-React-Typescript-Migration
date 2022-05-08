import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRolesAndPermissions from './UserRolesAndPermissions'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const addRole = (inputRole: string) => {
  const addButtonElement = screen.getByText('Add Role')
  userEvent.click(addButtonElement)
  const modalInputElement = screen.getByPlaceholderText('Role')
  const modalYesButtonElement = screen.getByRole('button', { name: 'Yes' })
  fireEvent.change(modalInputElement, { target: { value: inputRole } })
  userEvent.click(modalYesButtonElement)
}
describe('User Roles And Permissions Testing', () => {
  it('should render Roles and Permission page component without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    expect(screen.getByText('Roles and Permissions')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
    expect(screen.getByText('Add Role')).toBeInTheDocument()
  })
  it('should render add role modal on clicking add role button', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    const addButtonElement = screen.getByText('Add Role')
    userEvent.click(addButtonElement)
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Role')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should enable "Yes" button if the input field inside modal has value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    const buttonElement = screen.getByText('Add Role')
    userEvent.click(buttonElement)
    const modalInputElement = screen.getByPlaceholderText('Role')
    const modalYesButton = screen.getByRole('button', { name: 'Yes' })
    const modalNoButton = screen.getByRole('button', { name: 'No' })
    fireEvent.change(modalInputElement, { target: { value: 'IT Manager' } })
    expect(modalYesButton).toBeEnabled()
    expect(modalNoButton).toBeEnabled()
  })
  it('should add new role upon clicking "Yes" button if the input field inside modal has value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    addRole('IT Manager')
    await waitFor(() => {
      expect(screen.getAllByRole('option')).toHaveLength(4)
    })
  })
  it('should render menu items on role select', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.queryAllByText('option'),
    )
    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: /Delete Role/i }),
      ).toBeDisabled()
    })
  })
})
