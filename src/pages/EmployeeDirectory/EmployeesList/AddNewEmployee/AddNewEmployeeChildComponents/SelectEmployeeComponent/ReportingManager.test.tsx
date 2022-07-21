import React from 'react'
import '@testing-library/jest-dom'
import ReportingManager from './ReportingManager'
import { screen, render, fireEvent } from '../../../../../../test/testUtils'
import { mockProjectManagerList } from '../../../../../../test/data/projectManagerData'
import { selectedProjectManager } from '../../../../../../test/constants'

describe('Add ReportManager Component', () => {
  describe('Empty value of  ReportManager Component', () => {
    beforeEach(() => {
      render(
        <ReportingManager
          reportManagersList={[]}
          onSelectReportManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          reportValue={''}
        />,
      )
    })

    test('should be able to render ReportManager Component Title', () => {
      expect(screen.getByText('Reporting Manager:')).toBeInTheDocument()
    })

    test('should be able to render ReportManager Component label', () => {
      expect(screen.getByTestId('rmLabel')).toBeTruthy()
    })

    test('should be able to render ReportManager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Should be able to select ReportManager Component value', () => {
    beforeEach(() => {
      render(
        <ReportingManager
          reportManagersList={mockProjectManagerList}
          onSelectReportManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          reportValue={selectedProjectManager}
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

  describe('Should be able to reset ReportManager Component value', () => {
    beforeEach(() => {
      render(
        <ReportingManager
          reportManagersList={mockProjectManagerList}
          onSelectReportManager={jest.fn()}
          reportValue={'aaa'}
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
        <ReportingManager
          reportManagersList={mockProjectManagerList}
          onSelectReportManager={jest.fn()}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
          reportValue={'test'}
        />,
      )
    })

    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByRole('combobox')

      expect(input).toHaveValue('test') // empty value
    })
  })
})
