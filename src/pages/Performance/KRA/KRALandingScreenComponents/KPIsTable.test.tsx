import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KPIsTable from './KPIsTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockKPISelfDevDevelopmentList } from '../../../../test/data/KRAData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

//KRA ID is not a random number. It is the real kra id of the mock KPI
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KPIsTable kraId={546} />
  </div>
)

const modalContentId = 'modal-cnt-kpi'

describe('KPI Table', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kpisForIndividualKRAList: mockKPISelfDevDevelopmentList,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
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
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('table is there', () => {
      expect(screen.getByRole('table')).toBeVisible()
    })
    test('headers are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'KPI Name' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Description' }),
      ).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Frequency' }),
      ).toBeVisible()
      expect(screen.getByRole('columnheader', { name: 'Target' })).toBeVisible()
      expect(
        screen.getByRole('columnheader', { name: 'Actions' }),
      ).toBeVisible()
    })

    test('number of rows are rendered', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(4)
    })

    test('delete button functionality', () => {
      const delBtn = screen.getByTestId('del-btn-0')
      expect(delBtn).toBeEnabled()
      userEvent.click(delBtn)
      const yesBtn = screen.getByRole('button', { name: 'Yes' })
      expect(yesBtn).toBeVisible()
      userEvent.click(yesBtn)
    })

    test('name and description render', () => {
      const name = screen.getByTestId('kpi-Name-1')
      const description = screen.getByTestId('kpi-description-2')
      expect(name).toHaveTextContent('Learn new technologies or...')
      expect(description).toHaveTextContent('This testimonial of...')

      userEvent.click(description)
      const modalCnt = screen.getByTestId(modalContentId)
      expect(modalCnt).toBeVisible()
      expect(modalCnt).toHaveTextContent(
        'This testimonial of your learning and benchmark against industry, certification is must.',
      )
    })
  })
})
