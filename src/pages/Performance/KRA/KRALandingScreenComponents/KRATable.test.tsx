import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KRATable from './KRATable'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockKPISelfDevDevelopmentList,
  mockKRADataList,
} from '../../../../test/data/KRAData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'
import { KRATableDataItem } from '../../../../types/Performance/KRA/KRATypes'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KRATable
      paginationRange={[20, 40, 60, 60]}
      pageSize={20}
      currentPage={1}
      setCurrentPage={mockSetCurrentPage}
      setPageSize={mockSetPageSize}
      setAddKPI={jest.fn()}
    />
  </div>
)

describe('KRA Table', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
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
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kraData: mockKRADataList,
            kpisForIndividualKRAList: mockKPISelfDevDevelopmentList,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('column headers are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '' })).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'KRA Name' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'KRA Name' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Description' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Department' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Designation' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'No.of KPIs' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Actions' }),
      ).toBeVisible()
    })

    test('number of records rendered', () => {
      expect(screen.getByTestId('record-number')).toHaveTextContent(
        'Total Records: 127',
      )
    })
  })
})
