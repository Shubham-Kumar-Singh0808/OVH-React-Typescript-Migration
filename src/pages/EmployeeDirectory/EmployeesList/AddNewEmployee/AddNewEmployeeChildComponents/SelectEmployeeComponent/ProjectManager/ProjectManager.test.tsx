import React from 'react'
import '@testing-library/jest-dom'
import ProjectManager from '.'
import { screen, render, fireEvent } from '../../../../../../../test/testUtils'
import { mockProjectManagerList } from '../../../../../../../test/data/projectManagerData'
import { selectedProjectManager } from '../../../../../../../test/constants'

describe('Add ProjectManager Component', () => {
  describe('Empty value of  ProjectManager Component', () => {
    beforeEach(() => {
      render(
        <ProjectManager
          managersList={[]}
          onSelectManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          projectValue={''}
        />,
      )
    })

    test('should be able to render ProjectManager Component Title', () => {
      expect(screen.getByText('Project Manager:')).toBeInTheDocument()
    })

    test('should be able to render ProjectManager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render ProjectManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Should be able to select ProjectManager Component value', () => {
    beforeEach(() => {
      render(
        <ProjectManager
          managersList={mockProjectManagerList}
          onSelectManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          projectValue={selectedProjectManager}
        />,
      )
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText('Type name here for auto fill')
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
      expect(input).toHaveValue(selectedProjectManager)
    })
  })

  describe('Should be able to reset ProjectManager Component value', () => {
    beforeEach(() => {
      render(
        <ProjectManager
          managersList={mockProjectManagerList}
          onSelectManager={jest.fn()}
          projectValue={'aaa'}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText(
        'Type name here for auto fill',
      )
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'e' } })
      const dropdownOptions = screen.getAllByTestId('option')
      fireEvent.click(dropdownOptions[2])

      expect(autocomplete).toHaveValue('Omer Mohsin')
    })
  })

  describe('onSelect Test', () => {
    beforeEach(() => {
      render(
        <ProjectManager
          managersList={mockProjectManagerList}
          onSelectManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          projectValue={'test'}
        />,
      )
    })

    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByRole('combobox')

      expect(input).toHaveValue('test') // empty value
    })
  })
})
