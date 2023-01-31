import React from 'react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import EditEvent from './EditEvent'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const history = createMemoryHistory()
describe('Edit Event Component Testing', () => {
  beforeEach(() => {
    render(
      <Router history={history}>
        <EditEvent />
      </Router>,
      {
        preloadedState: {
          eventList: {
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  test('should render Edit Event component without crashing', () => {
    expect(screen.getByText('Event Edit')).toBeInTheDocument()
  })
  test('should render Update and Cancel Buttons', () => {
    const updateBtnElement = screen.getByRole('button', { name: 'Update' })
    expect(updateBtnElement).toBeTruthy()
    const cancelBtnElement = screen.getByRole('button', { name: 'Cancel' })
    userEvent.click(cancelBtnElement)
    expect(history.location.pathname).toBe('/eventList')
  })
  test('should be able to render ReservedBy Component Title', () => {
    expect(screen.getByText('Trainer:')).toBeInTheDocument()
  })
  test('should be able to enter in input field', () => {
    const input = screen.getByPlaceholderText('Trainer')
    expect(input).toHaveValue('')
  })
})
