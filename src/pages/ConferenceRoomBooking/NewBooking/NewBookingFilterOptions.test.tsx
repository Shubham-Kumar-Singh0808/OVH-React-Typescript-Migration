import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import NewBookingFilterOptions from './NewBookingFilterOptions'
import { render, screen } from '../../../test/testUtils'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NewBookingFilterOptions setToggle={jest.fn()} />
  </div>
)
const mockSetToggle = jest.fn()

describe('NewBookingFilterOptions Component Testing with data', () => {
  beforeEach(() => {
    render(toRender)
  })
  screen.debug()
  test('should render NewBooking component with out crashing', () => {
    const agenda = screen.getByTestId('text-area')
    userEvent.type(agenda, 'testing')
    expect(agenda).toHaveValue('testing')
  })

  test('should click on confirm button with out crashing', () => {
    const confirmButtonElement = screen.getByTestId('confirmBtn')
    expect(confirmButtonElement).toBeInTheDocument()
    userEvent.click(confirmButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
    expect(screen.getByTestId('confirmBtn')).toBeDisabled()
  })

  test('should click on room clear button with out crashing', () => {
    const clearButtonElement = screen.getByTestId('clearBtn')
    expect(clearButtonElement).toBeInTheDocument()
    userEvent.click(clearButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
    expect(screen.getByTestId('clearBtn')).toBeEnabled()
  })
})
