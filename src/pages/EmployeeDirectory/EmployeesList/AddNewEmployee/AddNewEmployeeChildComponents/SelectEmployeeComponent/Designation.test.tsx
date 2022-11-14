import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import DesignationField from './Designation'
import { screen, render } from '../../../../../../test/testUtils'
import { listComposer } from '../../../../../../utils/helper'
import { mockDesignationList } from '../../../../../../test/data/employeeDesignationListData'
import { ApiLoadingState } from '../../../../../../middleware/api/apiList'
import { mockAllDesignation } from '../../../../../../test/data/addEmployeeDesignationData'
import { mockUserAccessToFeaturesData } from '../../../../../../test/data/userAccessToFeaturesData'

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
          isRequired={false}
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
          isRequired={false}
        />,
        {
          preloadedState: {
            employeeDesignationList: {
              isLoading: ApiLoadingState.succeeded,
              employeeDesignations: mockAllDesignation,
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      )
    })

    test('should be able to see ADD button if isAddDisable is "true"', () => {
      expect(screen.getByTestId('designationButton')).toBeInTheDocument()
    })
  })

  describe('should render Employee Designation Component with the List of Designation', () => {
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
          isRequired={false}
        />,
      )
    })

    test('should be able to render Employee Designation Component without crashing', () => {
      screen.debug()
    })

    test('should render Employee Designation Component List Options with out crashing', () => {
      const designationSelector = screen.getByTestId('formDesignation')
      userEvent.selectOptions(designationSelector, ['Technical Lead'])
      expect(mockSetIsAccordionItemShow).toBeCalledWith('Technical Lead')
    })
  })
})
