import React from 'react'
import '@testing-library/jest-dom'
import ReporteesAutoComplete from './ReporteesAutoComplete'
import { screen, render, fireEvent, cleanup } from '../../../test/testUtils'
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
        <ReporteesAutoComplete
          managersOrHrManagersList={mockAllReportingManagerData}
          placeHolder={placeHolder}
          autoCompleteTarget={'a'}
          setAutoCompleteTarget={jest.fn}
          shouldRenderTable={false}
          setShouldRenderTable={jest.fn}
        />,
        {
          preloadedState: {
            changeReportees: {
              AllReportingManagerList: mockAllReportingManagerData,
            },
          },
        },
      )
    })

    test('should be able to render Reportees Manager Component label', () => {
      expect(screen.getByTestId('mLabel')).toBeTruthy()
    })

    test('should be able to render Reportees Manager Component placeholder', () => {
      expect(screen.getByRole('combobox')).toBeInTheDocument()
    })
  })

  describe('Should be able to select Reportees Manager Component value', () => {
    beforeEach(() => {
      render(
        <ReporteesAutoComplete
          managersOrHrManagersList={mockAllReportingManagerData}
          placeHolder={placeHolder}
          autoCompleteTarget={managerName}
          setAutoCompleteTarget={jest.fn}
          shouldRenderTable={false}
          setShouldRenderTable={jest.fn}
        />,
        {
          preloadedState: {
            changeReportees: {
              AllReportingManagerList: mockAllReportingManagerData,
            },
          },
        },
      )
    })

    test('should be able to enter in input field', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      expect(input).toHaveValue(managerName)
    })

    test('should be able to call onChange', () => {
      const input = screen.getByPlaceholderText(placeHolder)
      fireEvent.change(input, { target: { value: 'Ajay Ray' } })
      expect(input).toHaveValue(managerName)
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
        <ReporteesAutoComplete
          managersOrHrManagersList={mockAllReportingManagerData}
          placeHolder={placeHolder}
          autoCompleteTarget={''}
          setAutoCompleteTarget={jest.fn}
          shouldRenderTable={true}
          setShouldRenderTable={jest.fn}
        />,
        {
          preloadedState: {
            changeReportees: {
              AllReportingManagerList: mockAllReportingManagerData,
            },
          },
        },
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText(placeHolder)
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'a' } })
      // const dropdownOptions = screen.getByTestId('option')
      // fireEvent.click(dropdownOptions)

      expect(autocomplete).toHaveValue('')
    })

    test('renders clear button and triggers onClickHandler function on button click', () => {
      const clearButton = screen.getByTestId('clear-manager')
      expect(clearButton).toBeInTheDocument()
      fireEvent.click(clearButton)
      const autocomplete = screen.getByPlaceholderText(placeHolder)
      expect(autocomplete).toHaveValue('')
    })
  })
})
