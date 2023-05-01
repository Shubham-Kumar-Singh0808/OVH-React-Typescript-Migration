import '@testing-library/jest-dom'
import React from 'react'
import EventEndDate from './EventEndDate'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'

describe('EventEndDate Component', () => {
  beforeEach(() => {
    render(<EventEndDate toDateChangeHandler={jest.fn()} toDateValue={''} />)
  })

  test('should be able to render EventEndDate without crashing', () => {
    screen.debug()
  })

  test('should be able to see place holder "dd/mm/yyyy"', () => {
    expect(screen.getByPlaceholderText('DD/MM/YYYY')).toBeInTheDocument()
  })

  test('should be able to render EventEndDate label', () => {
    expect(screen.getByText('End Date :')).toBeInTheDocument()
  })

  test('should render date picker', () => {
    const dateInput = screen.findByTestId('dateOptionSelect')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', async () => {
    const datePickers = screen.getAllByPlaceholderText('DD/MM/YYYY')
    fireEvent.click(datePickers[0])

    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    expect(datePickers[0]).toHaveValue('')
  })
})
