/* eslint-disable import/named */
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import AddNewEmployee from '.'
import stateStore from '../../../../stateStore'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add New Employee Testing', () => {
  test('should render add new employee form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    screen.debug()
  })

  test('should be able to render Add Family button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('add-new-employee')).toBeInTheDocument()
  })

  test('should be able to render Clear button', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByTestId('clear-new-employee')).toBeInTheDocument()
  })

  test('should render 2 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewEmployee setToggleShift={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('User Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })
})
