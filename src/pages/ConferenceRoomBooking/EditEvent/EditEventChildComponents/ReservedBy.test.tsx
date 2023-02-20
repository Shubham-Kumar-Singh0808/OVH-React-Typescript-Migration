import React from 'react'
import '@testing-library/jest-dom'
import ReservedBy from './ReservedBy'
import { render, screen } from '../../../../test/testUtils'

describe('ReservedBy Component', () => {
  describe('Empty value of  ReservedBy Component', () => {
    beforeEach(() => {
      render(<ReservedBy eventReservedBy={''} />)
    })

    test('should be able to render ReservedBy Component Title', () => {
      expect(screen.getByText('Reserved by:')).toBeInTheDocument()
    })

    test('should be able to render ReservedBy Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })
    test('should be able to enter in input field', () => {
      const input = screen.getByTestId('event-reserved-by')
      expect(input).toHaveValue('')
    })
  })
})
