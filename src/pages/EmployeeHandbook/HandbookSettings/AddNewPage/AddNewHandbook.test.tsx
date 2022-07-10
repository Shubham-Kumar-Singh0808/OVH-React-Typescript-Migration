import '@testing-library/jest-dom'
import {
  fireEvent,
  queryByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
// eslint-disable-next-line import/named
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import AddNewHandbook from './AddNewHandbook'
import stateStore from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Add Template Component Testing', () => {
  test('should render Add Handbook Component without crashing', () => {
    const history = createMemoryHistory()
    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <AddNewHandbook
            headerTitle={''}
            confirmButtonText={''}
            backButtonHandler={function (): void {
              throw new Error('Function not implemented.')
            }}
          />
        </ReduxProvider>
      </Router>,
    )
    expect(screen.getByText('Title:')).toBeInTheDocument()
  })
})
