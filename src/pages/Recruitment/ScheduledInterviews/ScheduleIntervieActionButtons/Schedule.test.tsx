import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Schedule from './Schedule'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'

describe('Schedule component with data', () => {
  beforeEach(() => {
    render(<Schedule />, {
      preloadedState: {},
    })
  })
  test('should able to select values for options for respective select element', async () => {
    expect(screen.getByText('Schedule Interview')).toBeInTheDocument()
    const datePickers = screen.getAllByPlaceholderText('dd/mm/yyyy')
    fireEvent.click(datePickers[0])
    await waitFor(() =>
      fireEvent.change(datePickers[0], {
        target: { value: '29 Oct, 2019' },
      }),
    )
    expect(datePickers[0]).toHaveValue('10/29/2019')

    const startTimeHours = screen.getByTestId('hours')
    userEvent.type(startTimeHours, '10')
    expect(startTimeHours).toHaveValue('0')

    const startTimeMinutes = screen.getByTestId('minutes')
    userEvent.type(startTimeMinutes, '4')
    expect(startTimeMinutes).toHaveValue('064')

    const startTimeMeridian = screen.getByTestId('startTimeMeridian')
    userEvent.selectOptions(startTimeMeridian, ['AM'])
    expect(startTimeMeridian).toHaveValue('AM')

    const comments = screen.getByTestId('text-area')
    userEvent.type(comments, 'testing')
    expect(comments).toHaveValue('testing')
  })
})
