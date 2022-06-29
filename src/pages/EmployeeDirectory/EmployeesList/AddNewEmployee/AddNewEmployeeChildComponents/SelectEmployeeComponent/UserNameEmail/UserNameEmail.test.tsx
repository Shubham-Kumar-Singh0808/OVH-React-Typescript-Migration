import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UserNameEmail from '.'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import stateStore from '../../../../../../../stateStore'
import { Label } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

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
})
