import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KRAFilterOptions from './KRAFilterOptions'
import { cleanup, render, screen } from '../../../../test/testUtils'
import {
  mockDevelopmentDesignationList,
  mockEmpDepartments,
} from '../../../../test/data/KRAData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { selectDepartment, selectDesignation } from '../KRAConstants'
import { emptyString } from '../../../../constant/constantData'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KRAFilterOptions
      currentPage={1}
      pageSize={20}
      selectedDepartment={''}
      selectedDesignation={''}
      setSelectedDepartment={jest.fn()}
      setSelectedDesignation={jest.fn()}
    />
  </div>
)

const addKRABtnId = 'add-kra-screen-btn'
const viewBtnId = 'view-btn-id'
const clearBtnId = 'clear-btn-id'
const searchBtnId = 'search-btn-id'

const deptSelectId = 'dept-sel'
const desigSelectId = 'desig-sel'
const searchInputId = 'search-inp'
const selectDept = 'Select Department'
const selectDesg = 'Select Designation'
const deptSelectOption = 'Development'
const desigSelectOption = 'Project Manager'
const multiSearchValue = 'People'

describe('KRA Filter Options', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            currentOnScreenPage: KRAPages.kraList,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('all labels and buttons are rendered are rendered', () => {
      expect(screen.getByTestId('dept-label')).toHaveTextContent('Department:')
      expect(screen.getByTestId('desig-label')).toHaveTextContent(
        'Designation:',
      )
      expect(screen.getByTestId(addKRABtnId)).toBeEnabled()
      expect(screen.getByPlaceholderText('Multiple Search')).toBeVisible()
      expect(screen.getByTestId(viewBtnId)).toBeEnabled()
      expect(screen.getByTestId(clearBtnId)).toBeEnabled()
      expect(screen.getByTestId(searchBtnId)).toBeDisabled()
    })
    test('select department options length', () => {
      expect(screen.getByTestId(deptSelectId)).toHaveValue(selectDepartment)
      expect(screen.getAllByTestId('dept-opt')).toHaveLength(13)
    })

    test('view button functionality', () => {
      const viewBtn = screen.getByTestId(viewBtnId)
      const deptSelect = screen.getByTestId(deptSelectId)
      const desigSelect = screen.getByTestId(desigSelectId)
      const multiSearch = screen.getByTestId(searchInputId)
      userEvent.selectOptions(deptSelect, selectDept)
      expect(deptSelect).toHaveValue(selectDept)
      expect(viewBtn).toBeEnabled()

      expect(screen.getAllByTestId('desig-opt')).toHaveLength(43)
      userEvent.selectOptions(desigSelect, selectDesg)
      expect(desigSelect).toHaveValue(selectDesg)

      userEvent.type(multiSearch, multiSearchValue)
      expect(multiSearch).toHaveValue(multiSearchValue)
      expect(screen.getByTestId(searchBtnId)).toBeEnabled()

      userEvent.click(viewBtn)
    })

    test('clear button functionality', () => {
      const clearBtn = screen.getByTestId(clearBtnId)
      const deptSelect = screen.getByTestId(deptSelectId)
      const desigSelect = screen.getByTestId(desigSelectId)
      const multiSearch = screen.getByTestId(searchInputId)

      userEvent.selectOptions(deptSelect, deptSelectOption)
      userEvent.selectOptions(desigSelect, desigSelectOption)
      userEvent.type(multiSearch, multiSearchValue)

      userEvent.click(clearBtn)
      expect(deptSelect).toHaveValue(selectDepartment)
      expect(desigSelect).toHaveValue(selectDesignation)
      expect(multiSearch).toHaveValue(emptyString)
    })

    test('add kra button functionality', () => {
      userEvent.click(screen.getByTestId(addKRABtnId))
    })
  })
})
