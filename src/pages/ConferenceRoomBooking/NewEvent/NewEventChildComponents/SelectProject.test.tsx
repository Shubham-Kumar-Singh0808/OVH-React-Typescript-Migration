import React from 'react'
import '@testing-library/jest-dom'
import SelectProject from './SelectProject'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { selectedProjectManager } from '../../../../test/constants'
import { mockAllProjects } from '../../../../test/data/newEventData'

describe('Trainer Component', () => {
  describe('Empty value of  Trainer Component', () => {
    beforeEach(() => {
      render(
        <SelectProject
          allProjects={[]}
          onSelectProject={jest.fn()}
          isProjectAndAttendeesEnable={false}
          shouldReset={false}
        />,
      )
    })

    test('should be able to render ProjectManager Component Title', () => {
      expect(screen.getByText('Project :')).toBeInTheDocument()
    })

    test('should be able to render ProjectManager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ProjectManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Project')
      expect(input).toHaveValue('')
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedProjectManager)
      expect(input).toHaveValue('')
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, selectedProjectManager)
      expect(input).toHaveValue('')
    })
  })

  describe('Should be able to reset ProjectManager Component value', () => {
    beforeEach(() => {
      render(
        <SelectProject
          allProjects={mockAllProjects}
          onSelectProject={jest.fn()}
          isProjectAndAttendeesEnable={false}
          shouldReset={false}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Project')
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'e' } })

      expect(autocomplete).toHaveValue('e')
    })
    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByRole('combobox')

      expect(input).toHaveValue('') // empty value
    })
  })
})
