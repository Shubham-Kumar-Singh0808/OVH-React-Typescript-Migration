import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ReduxProvider } from './Helper'
import IdleModal from './IdleModal'
import stateStore from '../stateStore'

describe('Idle Modal Testing', () => {
  test('should load IdleModal without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <IdleModal timeout={1000} promptTimeout={30000} />
      </ReduxProvider>,
    )
    await waitFor(
      () => {
        expect(screen.getByText(/Do some activity/)).toBeInTheDocument()
      },
      { timeout: 2000 },
    )
  })

  test('should redirect to session timeout page after prompt timeout expires', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <IdleModal timeout={1000} promptTimeout={1000} />
        </ReduxProvider>
      </Router>,
    )

    await waitFor(
      () => {
        expect(history.location.pathname).toBe('/sessionExpire')
      },
      { timeout: 3000 },
    )
  })
})
