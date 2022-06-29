import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import EmploymentContract from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee Employment Contract Component', () => {
  test('should be able to render Employment Contract without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmploymentContract
          onStartDateChangeHandler={jest.fn()}
          onEndDateChangeHandler={jest.fn()}
          onContractExistHandler={jest.fn()}
          startDateValue={new Date()}
          endDateValue={new Date()}
          isContractExist={''}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
