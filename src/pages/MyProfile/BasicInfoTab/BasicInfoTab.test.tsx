import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import BasicInfoTab from './BasicInfoTab'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Basic Info Tab Testing', () => {
  test('should render basic info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <BasicInfoTab />
      </ReduxProvider>,
    )
    expect(screen.getByText('Employee ID:')).toBeInTheDocument()
  })
})
