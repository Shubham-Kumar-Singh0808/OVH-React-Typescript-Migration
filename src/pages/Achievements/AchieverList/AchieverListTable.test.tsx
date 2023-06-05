import '@testing-library/jest-dom'

import React from 'react'
import AchieverListTable from './AchieverListTable'
import { cleanup, fireEvent, render, screen } from '../../../test/testUtils'
import { mockAchieverList } from '../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetPageSize = jest.fn()
const mockSetCurrentPage = jest.fn()
const mockSetAchievementTimeline = jest.fn()

const toInitialRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchieverListTable
      currentPage={1}
      pageSize={20}
      setPageSize={mockSetPageSize}
      paginationRange={[1, 2, 3, 4, 5]}
      setCurrentPage={mockSetCurrentPage}
      setAchievementTimeline={mockSetAchievementTimeline}
      ToggleTimelineAccess={true}
    />
  </div>
)

describe('Testing Achiever List Table', () => {
  describe('Initial Render', () => {
    beforeEach(() => {
      render(toInitialRender, {
        preloadedState: {
          achieverList: {
            achieverList: mockAchieverList,
            isLoading: ApiLoadingState.succeeded,
          },
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      })
    })
    afterEach(cleanup)
    test('Table is rendered', () => {
      const table = screen.getByRole('table')
      expect(table).toBeTruthy()
    })
    test('Table headers are shown', () => {
      expect(
        screen.getByRole('columnheader', { name: 'Employee Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'From Month' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'To Month' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Time Period (yr)' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Description' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('should render correct number of rows', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(41)
    })
    test('render number of records', () => {
      const totRec = screen.getByTestId('record-number')
      expect(totRec).toBeInTheDocument()
    })
    test('should render toggle and timeline actions', () => {
      const element = screen.getByTestId('user-access-0')
      expect(element).toBeTruthy()
      expect(screen.getAllByTestId('btn-toggle')[0]).toBeInTheDocument()
      const button = screen.getByTestId('timeline-btn-1')
      expect(button).toHaveClass('btn-ovh me-2')
    })
    test('Timeline is opening on clicking the button', () => {
      const element = screen.getByTestId('timeline-btn-1')
      fireEvent.click(element)
      expect(mockSetAchievementTimeline).toHaveBeenCalledTimes(1)
    })
    test('Should pop up modal on description click', () => {
      const element = screen.getByTestId('description-0')
      expect(element).toBeInTheDocument()
      fireEvent.click(element)
      expect(screen.getAllByText('This is testing')[0]).toBeInTheDocument()
    })
    test('Should change on clicking toggle', () => {
      const toggleBtn = screen.getAllByTestId('btn-toggle')
      fireEvent.click(toggleBtn[0])
      expect(toggleBtn).toBeTruthy()
    })
  })
})
