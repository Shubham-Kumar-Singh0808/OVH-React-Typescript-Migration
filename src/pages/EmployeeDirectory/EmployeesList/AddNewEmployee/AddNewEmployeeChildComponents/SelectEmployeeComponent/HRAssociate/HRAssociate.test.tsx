import React from 'react'
import '@testing-library/jest-dom'
import HRAssociateField from '.'
import { screen, render, fireEvent } from '../../../../../../../test/testUtils'
import { mockEmployeeHRAssociateList } from '../../../../../../../test/data/employeeHRAssociateData'
import {
  hRAssociatePlaceHolder,
  selectedHRAssociate,
} from '../../../../../../../test/constants'

describe('Add HRAssociate Component', () => {
  describe('Empty value of  HRAssociate Component', () => {
    beforeEach(() => {
      render(
        <HRAssociateField
          hrDataList={[]}
          onSelectHRAssociate={jest.fn()}
          hrValue={''}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
        />,
      )
    })

    test('should be able to render HRAssociate Component Title', () => {
      expect(screen.getByText('HR Associate:')).toBeInTheDocument()
    })

    test('should be able to render HRAssociate Component label', () => {
      expect(screen.getByTestId('hrLabel')).toBeTruthy()
    })

    test('should be able to render HRAssociate Component placeholder', () => {
      expect(
        screen.getByPlaceholderText(hRAssociatePlaceHolder),
      ).toBeInTheDocument()
    })
  })

  describe('Should be able to select HRAssociate Component value', () => {
    beforeEach(() => {
      render(
        <HRAssociateField
          hrDataList={mockEmployeeHRAssociateList}
          onSelectHRAssociate={jest.fn()}
          hrValue={selectedHRAssociate}
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
        />,
      )
    })

    test('should be able to enter Hr associate', () => {
      const input = screen.getByPlaceholderText(hRAssociatePlaceHolder)
      expect(input).toHaveValue(selectedHRAssociate)
    })

    test('should be able to call onChange', () => {
      const input = screen.getByPlaceholderText(hRAssociatePlaceHolder)
      fireEvent.change(input, selectedHRAssociate)
      expect(input).toHaveValue(selectedHRAssociate)
    })

    test('should be able to call onSelect', () => {
      const input = screen.getByPlaceholderText(hRAssociatePlaceHolder)
      fireEvent.select(input, selectedHRAssociate)
      expect(input).toHaveValue(selectedHRAssociate)
    })
  })

  describe('Should be able to reset HRAssociate Component value', () => {
    beforeEach(() => {
      render(
        <HRAssociateField
          hrDataList={mockEmployeeHRAssociateList}
          onSelectHRAssociate={jest.fn()}
          hrValue={'aaa'} // assign a value
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
        />,
      )
    })

    test('Should be able to function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText(hRAssociatePlaceHolder)
      autocomplete.click()
      autocomplete.focus()

      fireEvent.change(autocomplete, { target: { value: 'a' } })
      const dropdownOptions = screen.getAllByTestId('option')
      fireEvent.click(dropdownOptions[2])

      expect(autocomplete).toHaveValue('Hr Manager')
    })
  })

  describe('onSelect Test', () => {
    beforeEach(() => {
      render(
        <HRAssociateField
          hrDataList={mockEmployeeHRAssociateList}
          onSelectHRAssociate={() => 'test'}
          hrValue={'test'} // assign a value
          dynamicFormLabelProps={jest.fn()}
          shouldReset={false}
        />,
      )
    })

    test('should be able to get a value base on hrValue value', () => {
      const input = screen.getByPlaceholderText(hRAssociatePlaceHolder)

      expect(input).toHaveValue('test') // empty value
    })
  })
})
