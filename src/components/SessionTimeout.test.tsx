import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import { ReduxProvider } from './Helper'
import SessionTimeout from './SessionTimeout'
import stateStore from '../stateStore'

describe('Session Timeout Page Testing', () => {
  test('should load IdleModal without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <SessionTimeout />
      </ReduxProvider>,
    )

    expect(screen.getByText(/Your session has timed out/)).toBeInTheDocument()
  })

  test('should redirect to login after button click', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <SessionTimeout />
        </ReduxProvider>
      </Router>,
    )

    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login')
    })
  })
})
