import '@testing-library/jest-dom'
import React from 'react'
import EventFromDate from './EventFromDate'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'

describe('New Event FromDate Component', () => {
  beforeEach(() => {
    render(
      <EventFromDate fromDateChangeHandler={jest.fn()} fromDateValue={''} />,
    )
  })

  test('should be able to render Event FromDate without crashing', () => {
    screen.debug()
  })

  test('should be able to see place holder "dd/mm/yyyy"', () => {
    expect(screen.getByPlaceholderText('dd/mm/yy')).toBeInTheDocument()
  })

  test('should be able to render Event FromDate label', () => {
    expect(screen.getByText('From Date :')).toBeInTheDocument()
  })

  test('should render date picker', () => {
    const dateInput = screen.findByTestId('dateOptionSelect')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', async () => {
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yy')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '21 Oct, 2019' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
  })
})
