/* eslint-disable sonarjs/no-duplicate-string */
import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import DesignationReportFilter from './DesignationReportFilter'
import * as goToThisPage from './goToThisPage'
import { render, screen } from '../../../../test/testUtils'
import { mockDesignation } from '../../../../test/data/employeeDesignationReportData'

const mockSetDesignation = jest.fn()
jest.mock('./goToThisPage')

describe('Employee Designation Report Filter Component Testing', () => {
  describe('Filter Options component without value', () => {
    beforeEach(() => {
      render(
        <DesignationReportFilter designation={''} setDesignation={jest.fn()} />,
      )
    })

    test('should render labels', () => {
      expect(screen.getByText('Designation:')).toBeInTheDocument()
    })
    test('should render designation dropdown', () => {
      const designationDropdown = screen.findByTestId('designationFilter')
      expect(designationDropdown).toBeTruthy()
    })
    test('should render back button', () => {
      const backBtn = screen.findByTestId('backBtn')
      expect(backBtn).toBeTruthy()
    })
    test('should render back button', () => {
      const exportBtn = screen.findByTestId('exportBtn')
      expect(exportBtn).toBeTruthy()
    })
  })

  describe('Filter Options component with value', () => {
    test('should render designatioon field without crashing', () => {
      render(
        <DesignationReportFilter
          designation={'Software Engineer'}
          setDesignation={mockSetDesignation}
        />,
        {
          preloadedState: {
            employeeDesignationReports: {
              getAllDesignation: mockDesignation,
            },
          },
        },
      )

      const designationDropdown = screen.getByTestId('designationSelect')
      userEvent.selectOptions(designationDropdown, ['Software Engineer'])
      expect(mockSetDesignation).toBeCalledWith('Software Engineer')
      expect(designationDropdown).toBeInTheDocument()
    })
  })

  describe('goToThisPage', () => {
    test('should call go to this page when back buttobn is clicked', () => {
      const goToThisPageSpy = jest
        .spyOn(goToThisPage, 'default')
        .mockImplementation(() => console.log('hi'))
      userEvent.click(screen.getByTestId('goToThisPage'))
      expect(goToThisPageSpy).toHaveBeenCalled()
    })
  })
})
