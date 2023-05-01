import React from 'react'
import '@testing-library/jest-dom'
import Trainer from './Trainer'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { selectedTrainerManager } from '../../../../test/constants'
import { mockTrainerDataList } from '../../../../test/data/newEventData'

describe('Trainer Component', () => {
  describe('Empty value of  Trainer Component', () => {
    beforeEach(() => {
      render(
        <Trainer
          allEmployeesProfiles={[]}
          onSelectTrainer={jest.fn()}
          shouldReset={false}
          trainerAutoCompleteTarget={''}
          setTrainerAutoCompleteTarget={jest.fn()}
        />,
      )
    })

    test('should be able to render ProjectManager Component Title', () => {
      expect(screen.getByText('Trainer :')).toBeInTheDocument()
    })

    test('should be able to render ProjectManager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ProjectManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Should be able to select ProjectManager Component value', () => {
    // eslint-disable-next-line sonarjs/no-identical-functions
    beforeEach(() => {
      render(
        <Trainer
          allEmployeesProfiles={[]}
          onSelectTrainer={jest.fn()}
          shouldReset={false}
          trainerAutoCompleteTarget={''}
          setTrainerAutoCompleteTarget={jest.fn()}
        />,
      )
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Trainer')
      expect(input).toHaveValue('')
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedTrainerManager)
      expect(input).toHaveValue('')
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, selectedTrainerManager)
      expect(input).toHaveValue('')
    })
  })

  describe('Should be able to reset ProjectManager Component value', () => {
    beforeEach(() => {
      render(
        <Trainer
          allEmployeesProfiles={mockTrainerDataList}
          onSelectTrainer={jest.fn()}
          shouldReset={false}
          trainerAutoCompleteTarget={''}
          setTrainerAutoCompleteTarget={jest.fn()}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Trainer')
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
