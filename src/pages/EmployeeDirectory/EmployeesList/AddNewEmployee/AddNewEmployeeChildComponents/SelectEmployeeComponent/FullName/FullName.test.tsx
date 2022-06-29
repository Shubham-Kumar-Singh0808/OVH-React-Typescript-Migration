import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import FullName from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee FullName Component', () => {
  test('should be able to render FullName without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <FullName
          firstNameChangeHandler={jest.fn()}
          lastNameChangeHandler={jest.fn()}
          middleNameChangeHandler={jest.fn()}
          firstNameValue={''}
          lastNameValue={''}
          middleNameValue={''}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
