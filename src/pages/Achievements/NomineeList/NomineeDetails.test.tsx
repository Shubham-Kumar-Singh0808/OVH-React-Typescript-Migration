import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NomineeDetails from './NomineeDetails'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockNomineeDetails } from '../../../test/data/NomineeListData'

const mockSetViewNomination = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NomineeDetails setViewNomination={mockSetViewNomination} />
  </div>
)

describe('Nominee Details', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          nomineeList: {
            isLoading: ApiLoadingState.succeeded,
            nomineeDetails: mockNomineeDetails,
          },
        },
      })
    })
    afterEach(cleanup)
    test('back button is enabled and functioning', () => {
      const backBtn = screen.getByTestId('back-btn')
      expect(backBtn).toBeEnabled()
      userEvent.click(backBtn)
      expect(mockSetViewNomination).toHaveBeenCalledTimes(1)
    })
    test('basic details are rendered', () => {
      const empNameLabel = screen.getByTestId('empName-label')
      expect(empNameLabel).toBeVisible()

      const achTypeLabel = screen.getByTestId('achType-label')
      expect(achTypeLabel).toBeVisible()

      const cycleLabel = screen.getByTestId('cycle-label')
      expect(cycleLabel).toBeVisible()

      const fromMonthLabel = screen.getByTestId('fromMonth-label')
      expect(fromMonthLabel).toBeVisible()

      const toMonthLabel = screen.getByTestId('toMonth-label')
      expect(toMonthLabel).toBeVisible()

      const empNameVal = screen.getByTestId('empName-val')
      expect(empNameVal).toBeVisible()

      const achNameVal = screen.getByTestId('achName-val')
      expect(achNameVal).toBeVisible()

      const cycleVal = screen.getByTestId('cycle-val')
      expect(cycleVal).toBeVisible()

      const fromMonthVal = screen.getByTestId('fromMonth-val')
      expect(fromMonthVal).toBeVisible()

      const toMonthVal = screen.getByTestId('toMonth-val')
      expect(toMonthVal).toBeVisible()
    })
  })
})
