import React from 'react'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import UserNameEmail from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee UserNameEmail Component', () => {
  test('should be able to render UserNameEmail without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserNameEmail
          usernameChangeHandler={jest.fn()}
          onAllowedUserChangeHandler={jest.fn()}
          username={''}
          isUserAllowed={false}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })

  test('should be able to call onChange', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserNameEmail
          usernameChangeHandler={jest.fn()}
          onAllowedUserChangeHandler={jest.fn()}
          username={'dog'}
          isUserAllowed={false}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    const username = screen.getByPlaceholderText('User Name')
    fireEvent.change(username, 'dog')
    expect(username).toHaveValue('dog')

    const email = screen.getByTestId('user-email-input')
    expect(email).toHaveValue('dog')
  })
})
