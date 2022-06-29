import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import BirthDate from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee Birthday Component', () => {
  test('should be able to render birthday without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <BirthDate
          onDateChangeHandler={jest.fn()}
          dateValue={new Date()}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
