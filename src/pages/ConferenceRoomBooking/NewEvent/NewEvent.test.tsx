import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import NewEvent from './NewEvent'
import { render, screen } from '../../../test/testUtils'

const mockSetTogglePage = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NewEvent />
  </div>
)

describe('NewEvent Component Testing', () => {
  test('should render NewEvent component with out crashing', () => {
    render(toRender)

    expect(screen.getByText('New Event')).toBeInTheDocument()
    const confirmBtnElement = screen.getByRole('button', { name: 'Confirm' })
    userEvent.click(confirmBtnElement)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(0)
    userEvent.click(screen.getByTestId('clearBtn'))
  })
})
