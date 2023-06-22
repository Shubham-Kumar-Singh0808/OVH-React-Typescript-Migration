import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AddKRA from './AddKRA'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockDevelopmentDesignationList,
  mockEmpDepartments,
} from '../../../../test/data/KRAData'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { emptyString } from '../../../../constant/constantData'
import { selectDepartment, selectDesignation } from '../KRAConstants'

const mockSetEnteredDescription = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddKRA
      enteredDescription="checking"
      setEnteredDescription={mockSetEnteredDescription}
    />
  </div>
)

const toErrorRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddKRA
      enteredDescription="checking"
      setEnteredDescription={mockSetEnteredDescription}
    />
  </div>
)

const mockKRAName = 'checking'
const mockKRADept = 'Development'
const mockKRADesig = 'z'
const mockKRAPercent = '20'

const addBtnId = 'add-kra-btn'
const clearBtnId = 'clear-kra-btn'

const nameInpId = 'kra-name-inp'
const percentInpId = 'percent-inp'

describe('Add KRA', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            kraDesigPercentage: 25,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('back button click', () => {
      userEvent.click(screen.getByTestId('back-btn'))
    })

    test('all labels are rendered', () => {
      expect(screen.getByTestId('kra-name-label')).toHaveTextContent(
        'KRA Name:*',
      )
      expect(screen.getByTestId('kra-name-asterix')).toHaveClass(TextDanger)

      expect(screen.getByTestId('dept-label')).toHaveTextContent('Department:*')
      expect(screen.getByTestId('dept-asterix')).toHaveClass(TextDanger)

      expect(screen.getByTestId('desig-label')).toHaveTextContent(
        'Designation:*',
      )
      expect(screen.getByTestId('desig-asterix')).toHaveClass(TextDanger)

      expect(screen.getByTestId('percent-label')).toHaveTextContent(
        'Percentage:*',
      )
      expect(screen.getByTestId('percent-asterix')).toHaveClass(TextDanger)

      expect(screen.getByTestId('descrip-label')).toHaveTextContent(
        'Description:',
      )
      expect(screen.getByTestId('error-percent')).toHaveClass(TextWhite)
    })

    test('number of dept options are rendered', () => {
      expect(screen.getAllByTestId('dept-opt')).toHaveLength(13)
    })

    test('clear button functionality', () => {
      const kraName = screen.getByTestId(nameInpId)
      const department = screen.getByTestId('dept-sel')
      const designation = screen.getByTestId('desig-sel')
      const percent = screen.getByTestId(percentInpId)

      expect(kraName).toHaveValue(emptyString)
      expect(department).toHaveValue(selectDepartment)
      expect(designation).toHaveValue(selectDesignation)
      expect(percent).toHaveValue(emptyString)
      expect(percent).toHaveAttribute('readOnly')

      userEvent.type(kraName, mockKRAName)
      expect(screen.getByTestId('kra-name-asterix')).toHaveClass(TextWhite)
      expect(kraName).toHaveValue(mockKRAName)

      userEvent.selectOptions(department, mockKRADept)
      expect(department).toHaveValue(mockKRADept)

      userEvent.selectOptions(designation, mockKRADesig)
      expect(designation).toHaveValue(mockKRADesig)

      userEvent.type(percent, mockKRAPercent)

      userEvent.click(screen.getByTestId(clearBtnId))

      expect(kraName).toHaveValue(emptyString)
      expect(department).toHaveValue(selectDepartment)
      expect(designation).toHaveValue(selectDesignation)
      expect(percent).toHaveValue(emptyString)
    })

    test('add button functionaly', () => {
      const kraName = screen.getByTestId(nameInpId)
      const department = screen.getByTestId('dept-sel')
      const designation = screen.getByTestId('desig-sel')
      const percent = screen.getByTestId(percentInpId)

      userEvent.type(kraName, mockKRAName)
      userEvent.selectOptions(department, mockKRADept)
      userEvent.selectOptions(designation, mockKRADesig)
      userEvent.type(percent, mockKRAPercent)

      const addBtn = screen.getByTestId(addBtnId)
      expect(addBtn).toBeEnabled()
      userEvent.click(addBtn)
    })
  })

  describe('render', () => {
    beforeEach(() => {
      render(toErrorRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            kraDesigPercentage: 100,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('error message displayed', () => {
      const kraName = screen.getByTestId(nameInpId)
      const department = screen.getByTestId('dept-sel')
      const designation = screen.getByTestId('desig-sel')
      const percent = screen.getByTestId(percentInpId)

      userEvent.type(kraName, mockKRAName)
      userEvent.selectOptions(department, mockKRADept)
      userEvent.selectOptions(designation, mockKRADesig)
      userEvent.type(percent, mockKRAPercent)

      expect(screen.getByTestId('error-percent')).toHaveClass(TextDanger)
    })
  })

  describe('duplicate render', () => {
    beforeEach(() => {
      render(toErrorRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            kraDesigPercentage: 20,
            isNewKRADuplicate: true,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('error message displayed', () => {
      const kraName = screen.getByTestId(nameInpId)
      const department = screen.getByTestId('dept-sel')
      const designation = screen.getByTestId('desig-sel')
      const percent = screen.getByTestId(percentInpId)

      userEvent.type(kraName, mockKRAName)
      userEvent.selectOptions(department, mockKRADept)
      userEvent.selectOptions(designation, mockKRADesig)
      userEvent.type(percent, mockKRAPercent)

      userEvent.click(screen.getByTestId(addBtnId))
    })
  })
})
