import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmploymentContract from './EmploymentContract'
import { fireEvent, render, screen } from '../../../../../../test/testUtils'

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

    test('should be able to see place holder "Select start date" and "Select end date"', () => {
      const input = screen.getAllByPlaceholderText('dd/mm/yy')
      expect(input[0]).toBeInTheDocument()
      expect(input[1]).toBeInTheDocument()
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

    test('should be able to select end date', () => {
      const dateInput = screen.getAllByPlaceholderText('dd/mm/yy')
      userEvent.type(
        dateInput[0],
        new Date('12/22/2021').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
    })

    test('Radio button should be true if isContractExist is "true"', () => {
      const activeRadio = screen.getByRole('radio', {
        name: 'Yes',
      }) as HTMLInputElement

      const inactiveRadio = screen.getByRole('radio', {
        name: 'No',
      }) as HTMLInputElement

      expect(activeRadio.checked).toEqual(true)
      expect(inactiveRadio.checked).toEqual(false)

      fireEvent.click(inactiveRadio)

      expect(activeRadio.checked).toEqual(false)
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

    test('Radio button should be false if isContractExist is "False"', () => {
      const activeRadio = screen.getByRole('radio', {
        name: 'Yes',
      }) as HTMLInputElement

      const inactiveRadio = screen.getByRole('radio', {
        name: 'No',
      }) as HTMLInputElement

      expect(activeRadio.checked).toEqual(false)
      expect(inactiveRadio.checked).toEqual(true)
    })
  })
})
