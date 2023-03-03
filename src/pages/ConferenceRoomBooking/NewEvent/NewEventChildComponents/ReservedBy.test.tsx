import React from 'react'
import '@testing-library/jest-dom'
import ReservedBy from './ReservedBy'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import {
  selectedReservedBy,
  selectedTrainerManager,
} from '../../../../test/constants'

describe('ReservedBy Component', () => {
  describe('Empty value of  ReservedBy Component', () => {
    beforeEach(() => {
      render(
        <ReservedBy
          loggedEmployeeName={''}
          allEmployeesProfiles={[]}
          onSelectAuthor={jest.fn()}
        />,
      )
    })

    test('should be able to render ReservedBy Component Title', () => {
      expect(screen.getByText('Reserved by :')).toBeInTheDocument()
    })

    test('should be able to render ReservedBy Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ReservedBy Component placeholder', () => {
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
