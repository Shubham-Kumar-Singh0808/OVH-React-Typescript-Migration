import React from 'react'
import '@testing-library/jest-dom'
import ReservedBy from './ReservedBy'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import {
  selectedReservedBy,
  selectedTrainerManager,
} from '../../../../test/constants'

describe('Trainer Component', () => {
  describe('Empty value of  Trainer Component', () => {
    beforeEach(() => {
      render(
        <ReservedBy
          loggedEmployeeName={''}
          allEmployeesProfiles={[]}
          onSelectAuthor={jest.fn()}
        />,
      )
    })

    test('should be able to render ProjectManager Component Title', () => {
      expect(screen.getByText('Reserved by:')).toBeInTheDocument()
    })

    test('should be able to render ProjectManager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ProjectManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Reserved By')
      expect(input).toHaveValue('')
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedReservedBy)
      expect(input).toHaveValue('')
    })
    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, selectedTrainerManager)
      expect(input).toHaveValue('')
    })
  })
})
