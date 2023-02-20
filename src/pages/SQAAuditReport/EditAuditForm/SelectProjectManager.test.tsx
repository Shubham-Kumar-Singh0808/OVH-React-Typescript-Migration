import React from 'react'
import '@testing-library/jest-dom'
import SelectProjectManager from './SelectProjectManager'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { selectedProjectManager } from '../../../test/constants'
import { mockProjectManagerList } from '../../../test/data/projectManagerData'

describe('Trainer Component', () => {
  describe('Empty value of  Trainer Component', () => {
    beforeEach(() => {
      render(
        <SelectProjectManager
          managers={mockProjectManagerList}
          onSelectManager={jest.fn()}
          projectManagerValue={selectedProjectManager}
        />,
        {
          preloadedState: {
            reportingManagers: {
              getAllReportingManagers: mockProjectManagerList,
            },
          },
        },
      )
    })

    test('should be able to render ProjectManager Component Title', () => {
      expect(screen.getByText('Project Manager :')).toBeInTheDocument()
    })

    test('should be able to render ProjectManager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ProjectManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Project Manager')
      expect(input).toHaveValue(selectedProjectManager)
    })

    test('should be able to call onChange', () => {
      const input = screen.getByRole('combobox')
      fireEvent.change(input, selectedProjectManager)
      expect(input).toHaveValue(selectedProjectManager)
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByRole('combobox')

      fireEvent.select(input, selectedProjectManager)
      expect(input).toHaveValue('Omer Mohsin')
    })
  })

  describe('Should be able to reset ProjectManager Component value', () => {
    beforeEach(() => {
      render(
        <SelectProjectManager
          managers={mockProjectManagerList}
          onSelectManager={jest.fn()}
          projectManagerValue={selectedProjectManager}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Project Manager')
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'e' } })

      expect(autocomplete).toHaveValue('e')
    })
    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByRole('combobox')

      expect(input).toHaveValue('Omer Mohsin') // empty value
    })
  })
})
