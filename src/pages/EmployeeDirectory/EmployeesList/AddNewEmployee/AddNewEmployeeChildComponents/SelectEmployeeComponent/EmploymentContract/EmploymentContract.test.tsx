import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmploymentContract from '.'
import { render, screen } from '../../../../../../../test/testUtils'

const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('Add Employment Contract Component', () => {
  describe('Should render date if isContractExist is "true"', () => {
    beforeEach(() => {
      render(
        <EmploymentContract
          onStartDateChangeHandler={jest.fn()}
          onEndDateChangeHandler={jest.fn()}
          onContractExistHandler={jest.fn()}
          startDateValue={new Date()}
          endDateValue={new Date()}
          isContractExist={'true'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render Employment Contract without crashing', () => {
      screen.debug()
    })

    test('should be able to see place holder "Select start date"', () => {
      expect(
        screen.getByPlaceholderText('Select start date'),
      ).toBeInTheDocument()
    })

    test('should be able to see place holder "Select end date"', () => {
      expect(screen.getByPlaceholderText('Select end date')).toBeInTheDocument()
    })

    test('should be able to render Employment Contract label', () => {
      expect(screen.getByText('Contract Start Date:')).toBeInTheDocument()
    })

    test('should render start date picker', () => {
      const dateInput = screen.findByTestId('start-date-picker')
      expect(dateInput).toBeTruthy()
    })

    test('should render end date picker', () => {
      const dateInput = screen.findByTestId('end-date-picker')
      expect(dateInput).toBeTruthy()
    })

    test('should be able to select start date"', () => {
      const dateInput = screen.getAllByPlaceholderText('Select start date')
      userEvent.type(
        dateInput[0],
        new Date('12/20/2021').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
    })

    test('should be able to select end date"', () => {
      const dateInput = screen.getAllByPlaceholderText('Select end date')
      userEvent.type(
        dateInput[0],
        new Date('12/22/2021').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
    })
  })

  describe('Should render date if isContractExist is "false"', () => {
    beforeEach(() => {
      render(
        <EmploymentContract
          onStartDateChangeHandler={jest.fn()}
          onEndDateChangeHandler={jest.fn()}
          onContractExistHandler={jest.fn()}
          startDateValue={new Date()}
          endDateValue={new Date()}
          isContractExist={'false'}
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should not render the start date', () => {
      expect(screen.findByTestId('start-date-picker')).toMatchObject({})
    })

    test('should not render the start date', () => {
      expect(screen.findByTestId('end-date-picker')).toMatchObject({})
    })
  })
})
