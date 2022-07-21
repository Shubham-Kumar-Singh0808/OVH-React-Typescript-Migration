import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import BirthDate from './Birthday'
import { render, screen } from '../../../../../../test/testUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('Add Employee Birthday Component', () => {
  beforeEach(() => {
    render(
      <BirthDate
        onDateChangeHandler={jest.fn()}
        dateValue={new Date()}
        dynamicFormLabelProps={jest.fn()}
      />,
    )
  })

  test('should be able to render birthday without crashing', () => {
    screen.debug()
  })

  test('should be able to see place holder "dd/mm/yy"', () => {
    expect(screen.getByPlaceholderText('dd/mm/yy')).toBeInTheDocument()
  })

  test('should be able to render Birthday label', () => {
    expect(screen.getByText('Birthday:')).toBeInTheDocument()
  })

  test('should render date picker', () => {
    const dateInput = screen.findByTestId('date-picker')
    expect(dateInput).toBeTruthy()
  })

  test('should be able to select date"', () => {
    const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
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
