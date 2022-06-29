import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import Shift from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee Shift Component', () => {
  test('should be able to render Shift without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <Shift
          list={[]}
          setValue={jest.fn()}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )

    screen.debug()
  })
})
