import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import OSelectList from './index'
import { render, screen } from '../../../test/testUtils'
import { listComposer } from '../../../utils/helper'
import { mockDesignationList } from '../../../test/data/employeeDesignationListData'

const mockSetIsAccordionItemShow = jest.fn()

describe('Add Employee OSelectList Component', () => {
  describe('Should be able to render component if no list provided', () => {
    beforeEach(() => {
      render(
        <OSelectList
          list={[]}
          setValue={jest.fn()}
          value="Test Value"
          name="Test Name"
          label="Test Label"
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render Employee OSelectList Component without crashing', () => {
      screen.debug()
    })

    test('should be able to render Employee OSelectList Component Name', () => {
      expect(screen.getByText('Test Name:')).toBeInTheDocument()
    })

    test('should be able to render Employee OSelectList Component label', () => {
      expect(screen.getByTestId('selectLabel')).toBeTruthy()
    })
  })

  describe('should render Employee OSelectList Component with the List of OSelectList', () => {
    beforeEach(() => {
      const composedOSelectListList = listComposer(
        mockDesignationList as [],
        'id',
        'name',
      )

      render(
        <OSelectList
          list={composedOSelectListList}
          setValue={mockSetIsAccordionItemShow}
          value={''}
          name="Test Name"
          label="Test Label"
          dynamicFormLabelProps={jest.fn()}
        />,
      )
    })

    test('should be able to render Employee OSelectList Component without crashing', () => {
      screen.debug()
    })

    test('should render Employee OSelectList Component List Options with out crashing', () => {
      const OSelectListSelector = screen.getByTestId('formTest Name')
      userEvent.selectOptions(OSelectListSelector, ['Technical Architect'])
      expect(mockSetIsAccordionItemShow).toBeCalledWith('Technical Architect')
    })

    test('should be able to correctly set default option', () => {
      expect(
        screen.getByRole('option', { name: 'Test Label' }).selected,
      ).toBeTruthy()
    })
  })
})
