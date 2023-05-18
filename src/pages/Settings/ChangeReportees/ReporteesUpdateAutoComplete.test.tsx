import React from 'react'
import '@testing-library/jest-dom'
import ReporteesUpdateAutoComplete from './ReporteesUpdateAutoComplete'
import { screen, render, fireEvent } from '../../../test/testUtils'
import {
  mockAllHRList,
  mockAllReportingManagerData,
} from '../../../test/data/ChangeReporteesData'

const placeHolder = 'Manager Name'
const managerName = 'Ajay Ray'

describe('Testing Reportees AutoComplete Component', () => {
  describe('Empty value of Reportees AutoComplete Component', () => {
    beforeEach(() => {
      render(
        <ReporteesUpdateAutoComplete
          managersOrHrManagersList={[]}
          placeHolder={placeHolder}
          setManagerId={jest.fn}
          setValidName={jest.fn}
          autoCompleteTarget={''}
        />,
      )
    })

    test('should be able to render Reportees Manager Component label', () => {
      expect(screen.getByTestId('pmLabel')).toBeTruthy()
    })

    test('should be able to render Reportees Manager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Should be able to select Reportees Manager Component value', () => {
    beforeEach(() => {
      render(
        <ReporteesUpdateAutoComplete
          managersOrHrManagersList={mockAllReportingManagerData}
          placeHolder={placeHolder}
          setManagerId={jest.fn}
          setValidName={jest.fn}
          autoCompleteTarget={''}
        />,
      )
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      expect(input).toHaveValue('')
    })

    test('should be able to call onChange', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      fireEvent.change(input, { target: { value: 'a' } })
      expect(input).toHaveValue('a')
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      fireEvent.select(input, { target: { value: 'Ajay Ray' } })
      expect(input).toHaveValue(managerName)
    })
  })

  describe('Should be able to reset ReportManager Component value', () => {
    beforeEach(() => {
      render(
        <ReporteesUpdateAutoComplete
          managersOrHrManagersList={mockAllHRList}
          placeHolder={placeHolder}
          setManagerId={jest.fn}
          setValidName={jest.fn}
          autoCompleteTarget={'aaa'}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText(placeHolder)
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'a' } })
      //   const dropdownOptions = screen.getAllByTestId('option')
      //   fireEvent.click(dropdownOptions[2])

      expect(autocomplete).toHaveValue('a')
    })

    test('renders clear button and triggers onClickHandler function on button click', () => {
      const clearButton = screen.getByTestId('clear-manager')
      expect(clearButton).toBeInTheDocument()
      const autocomplete = screen.getByPlaceholderText(placeHolder)
      expect(autocomplete).toHaveValue('')
    })
  })
})
