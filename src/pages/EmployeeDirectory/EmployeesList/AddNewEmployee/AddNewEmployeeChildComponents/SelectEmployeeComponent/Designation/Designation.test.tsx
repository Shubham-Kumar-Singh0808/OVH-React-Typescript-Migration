import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import DesignationField from '.'
import { screen, render } from '../../../../../../../test/testUtils'
import { listComposer } from '../../../../../../../utils/helper'
import { mockDesignationList } from '../../../../../../../test/data/employeeDesignationListData'

const mockSetIsAccordionItemShow = jest.fn()

describe('Add Employee Designation Component', () => {
  describe('if isAddDisable is false', () => {
    beforeEach(() => {
      render(
        <DesignationField
          list={[]}
          setValue={jest.fn()}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
          isAddDisable={true}
        />,
      )
    })

    test('should be able to render Employee Designation Component without crashing', () => {
      screen.debug()
    })

    test('should be able to render Employee Designation Component Title', () => {
      expect(screen.getByText('Designation:')).toBeInTheDocument()
    })

    test('should be able to render Employee Designation Component label', () => {
      expect(screen.getByTestId('designationLabel')).toBeTruthy()
    })

    test('should be able to correctly set default option', () => {
      expect(
        screen.getByRole('option', { name: 'Select Designation' }).selected,
      ).toBeTruthy()
    })
  })

  describe('if isAddDisable is true', () => {
    beforeEach(() => {
      render(
        <DesignationField
          list={[]}
          setValue={jest.fn()}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
          isAddDisable={false}
        />,
      )
    })

    test('should be able to see ADD button if isAddDisable is "true"', () => {
      expect(screen.getByTestId('designationButton')).toBeInTheDocument()
    })
  })

  describe('should render Employee Designation Component with out crashing', () => {
    beforeEach(() => {
      const composedDesignationList = listComposer(
        mockDesignationList as [],
        'id',
        'name',
      )

      render(
        <DesignationField
          list={composedDesignationList}
          setValue={mockSetIsAccordionItemShow}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
          isAddDisable={false}
        />,
      )
    })

    test('should be able to render Employee Designation Component without crashing', () => {
      screen.debug()
    })

    test('should render Employee Designation Component List Options with out crashing', () => {
      const designationSelector = screen.getByTestId('form-select')
      userEvent.selectOptions(designationSelector, ['Accounts & Finance'])
      expect(mockSetIsAccordionItemShow).toBeCalledWith('Accounts & Finance')
    })
  })
})
