import '@testing-library/jest-dom'

import React from 'react'
import FilterEmployeeName from './FilterEmployeeName'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'

const mockOnSelect = jest.fn()
const mockSetEmpName = jest.fn()

const selectedEmpName = 'Pradeep Namburu'

describe('filter employee name', () => {
  describe('empty values', () => {
    beforeEach(() => {
      render(
        <FilterEmployeeName
          allEmployees={[]}
          onSelectEmployee={mockOnSelect}
          employeeName={undefined}
          setEmployeeName={mockSetEmpName}
        />,
      )
    })
    afterEach(cleanup)

    test('render label', () => {
      const empLabel = screen.getByTestId('ach-emp-name')
      expect(empLabel).toBeInTheDocument()
      expect(empLabel).toHaveTextContent('Employee Name :*')
    })

    test('render placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('render the input field', () => {
      const input = screen.getByPlaceholderText('Employee Name')
      expect(input).toHaveValue('')
    })

    test('should call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedEmpName)
      expect(input).toHaveValue('')
    })

    test('should call onSelect', () => {
      const input = screen.getByRole('combobox')
      fireEvent.select(input, selectedEmpName)
      expect(input).toHaveValue('')
    })
  })

  describe('should reset', () => {
    beforeEach(() => {
      render(
        <FilterEmployeeName
          allEmployees={mockActiveEmployeeList}
          onSelectEmployee={mockOnSelect}
          employeeName={'P'}
          setEmployeeName={mockSetEmpName}
        />,
      )
    })
    afterEach(cleanup)
    test('should function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Employee Name')
      autocomplete.click()
      autocomplete.focus()
      fireEvent.change(autocomplete, { target: { value: 'r' } })
    })
  })
})
