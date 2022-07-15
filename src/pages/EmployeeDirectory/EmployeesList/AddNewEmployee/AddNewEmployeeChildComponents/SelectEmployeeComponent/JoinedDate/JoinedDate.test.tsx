import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import JoinDate from '.'
import { render, screen } from '../../../../../../../test/testUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('Add Employee JoinDate Component', () => {
  beforeEach(() => {
    render(
      <JoinDate
        onDateChangeHandler={jest.fn()}
        dateValue={new Date()}
        dynamicFormLabelProps={jest.fn()}
      />,
    )
  })

  test('should be able to render JoinDate without crashing', () => {
    screen.debug()
  })

  test('should be able to see place holder "Select joined date"', () => {
    expect(
      screen.getByPlaceholderText('Select joined date'),
    ).toBeInTheDocument()
  })

  test('should be able to render JoinDate label', () => {
    expect(screen.getByText('Date of Joining:')).toBeInTheDocument()
  })

  test('should render date picker', () => {
    const dateInput = screen.findByTestId('date-picker')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', () => {
    const dateInput = screen.getAllByPlaceholderText('Select joined date')
    userEvent.type(
      dateInput[0],
      new Date('12/20/2021').toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    )
  })
})
