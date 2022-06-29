import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import DesignationField from '.'
import stateStore from '../../../../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Employee Designation Component', () => {
  test('should be able to render Designation without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <DesignationField
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

  test('should be able to correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <DesignationField
          list={[]}
          setValue={jest.fn()}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Designation' }).selected,
    ).toBe(true)
  })
})
