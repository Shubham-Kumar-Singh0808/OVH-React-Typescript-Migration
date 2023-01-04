import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EditKRA from './EditKRA'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockDevelopmentDesignationList,
  mockEditKRAData,
  mockEmpDepartments,
} from '../../../../test/data/KRAData'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { KRAPages } from '../../../../types/Performance/KRA/KRATypes'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EditKRA />
  </div>
)

const updateBtnId = 'update-kra-btn'

describe('Edit KRA', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            kraDesigPercentage: 55,
            editThisKra: mockEditKRAData,
            currentOnScreenPage: KRAPages.editKra,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('update button functionality', () => {
      const errorMess = screen.getByTestId('error-percent')
      const name = screen.getByTestId('kra-name-inp')
      const dept = screen.getByTestId('dept-sel')
      const desig = screen.getByTestId('desig-sel')
      const percent = screen.getByTestId('percent-inp')

      expect(name).toHaveValue('Project')
      expect(dept).toHaveValue('Development')
      expect(desig).toHaveValue('Senior Consultant')
      expect(errorMess).toHaveClass(TextWhite)

      userEvent.clear(percent)
      userEvent.type(percent, '90')
      expect(errorMess).toHaveClass(TextDanger)

      userEvent.clear(percent)
      userEvent.type(percent, '40')
      expect(errorMess).toHaveClass(TextWhite)

      userEvent.clear(percent)
      userEvent.type(percent, '35')
      expect(errorMess).toHaveClass(TextWhite)

      userEvent.click(screen.getByTestId(updateBtnId))
    })
  })

  describe('duplicate render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            empDepartments: mockEmpDepartments,
            designations: mockDevelopmentDesignationList,
            kraDesigPercentage: 55,
            editThisKra: mockEditKRAData,
            currentOnScreenPage: KRAPages.editKra,
            isNewKRADuplicate: true,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('show error', () => {
      userEvent.click(screen.getByTestId(updateBtnId))
    })
  })
})
