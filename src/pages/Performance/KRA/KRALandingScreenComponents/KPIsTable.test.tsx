import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import KPIsTable from './KPIsTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockKPISelfDevDevelopmentList } from '../../../../test/data/KRAData'

//KRA ID is not a random number. It is the real kra id of the mock KPI
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <KPIsTable kraId={546} />
  </div>
)

describe('KPI Table', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          KRA: {
            isLoading: ApiLoadingState.succeeded,
            kpisForIndividualKRAList: mockKPISelfDevDevelopmentList,
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
      expect(screen.queryAllByRole('row')).toHaveLength(5)
    })

    test('delete button functionality', () => {
      const delBtn = screen.getByTestId('del-btn-0')
      expect(delBtn).toBeEnabled()
      userEvent.click(delBtn)
      const modalCnt = screen.getByTestId('modal-cnt')
      expect(screen.getByTestId('modal-cnt')).toBeVisible()
      expect(modalCnt).toHaveTextContent(
        'Do you want to delete this Help others in resolving issues and meet deadlines?',
      )
      const yesBtn = screen.getByRole('button', { name: 'Yes' })
      expect(yesBtn).toBeVisible()
      userEvent.click(yesBtn)
    })
  })
})
