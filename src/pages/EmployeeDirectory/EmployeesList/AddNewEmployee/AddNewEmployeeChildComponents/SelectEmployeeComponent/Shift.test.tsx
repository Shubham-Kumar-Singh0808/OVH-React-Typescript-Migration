import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import ShiftField from './Shift'
import { screen, render } from '../../../../../../test/testUtils'
import { mockShifts } from '../../../../../../test/data/employeeDesignationListData'

const mockSetIsAccordionItemShow = jest.fn()

describe('Add Employee Shift Component', () => {
  describe('if isAddDisable is false', () => {
    beforeEach(() => {
      render(
        <ShiftField
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

    test('should be able to render Employee Shift Component Title', () => {
      expect(screen.getByText('Shift:')).toBeInTheDocument()
    })

    test('should be able to correctly set default option', () => {
      expect(
        screen.getByRole('option', { name: 'Select Shift' }).selected,
      ).toBeTruthy()
    })
  })

  describe('if isAddDisable is true', () => {
    beforeEach(() => {
      render(
        <ShiftField
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
      expect(screen.getByTestId('shiftButton')).toBeInTheDocument()
    })
  })

  describe('should render Employee Shift Component with the List of Shift', () => {
    beforeEach(() => {
      render(
        <ShiftField
          list={mockShifts}
          setValue={mockSetIsAccordionItemShow}
          setToggleShift={jest.fn()}
          value={''}
          toggleValue={false}
          dynamicFormLabelProps={jest.fn()}
          isAddDisable={false}
        />,
      )
    })

    test('should render Employee Shift Component List Options with out crashing', () => {
      const shiftSelector = screen.getByTestId('formShift')
      userEvent.selectOptions(shiftSelector, ['Canada Shift'])
      expect(mockSetIsAccordionItemShow).toBeCalledWith({
        endTimeHour: '09',
        endTimeMinutes: '35',
        graceTime: '12',
        id: 16,
        name: 'Canada Shift',
        startTimeHour: '23',
        startTimeMinutes: '59',
      })
    })
  })
})
