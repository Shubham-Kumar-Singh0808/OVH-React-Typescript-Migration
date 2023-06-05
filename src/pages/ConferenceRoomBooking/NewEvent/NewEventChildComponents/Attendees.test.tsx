import React from 'react'
import '@testing-library/jest-dom'
import Attendees from './Attendees'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { selectedAttendees } from '../../../../test/constants'
import { mockTrainerDataList } from '../../../../test/data/newEventData'

describe('Attendees Component', () => {
  describe('Empty value of  Attendees Component', () => {
    beforeEach(() => {
      render(
        <Attendees
          allEmployeesProfiles={[]}
          isProjectAndAttendeesEnable={false}
          onSelectAttendee={jest.fn()}
          isErrorShow={false}
          isAttendeeErrorShow={false}
          setIsAttendeeErrorShow={jest.fn()}
          setIsErrorShow={jest.fn()}
          attendeesAutoCompleteTarget={''}
          setAttendeesAutoCompleteTarget={jest.fn()}
        />,
      )
    })

    test('should be able to render Attendees Component Title', () => {
      expect(screen.getByText('Attendees :')).toBeInTheDocument()
    })

    test('should be able to render Attendees Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render Attendees Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Attendee Name')
      expect(input).toHaveValue('')
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedAttendees)
      expect(input).toHaveValue('')
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, selectedAttendees)
      expect(input).toHaveValue('')
    })
  })

  describe('Should be able to reset Attendees Component value', () => {
    beforeEach(() => {
      render(
        <Attendees
          allEmployeesProfiles={mockTrainerDataList}
          isProjectAndAttendeesEnable={false}
          onSelectAttendee={jest.fn()}
          isErrorShow={false}
          isAttendeeErrorShow={false}
          setIsAttendeeErrorShow={jest.fn()}
          setIsErrorShow={jest.fn()}
          attendeesAutoCompleteTarget={''}
          setAttendeesAutoCompleteTarget={jest.fn()}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Attendee Name')
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'e' } })

      expect(autocomplete).toHaveValue('')
    })
    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByRole('combobox')

      expect(input).toHaveValue('') // empty value
    })
  })
})
