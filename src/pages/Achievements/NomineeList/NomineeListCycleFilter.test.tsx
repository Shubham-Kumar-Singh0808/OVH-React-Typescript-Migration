import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NomineeListCycleFilter from './NomineeListCycleFilter'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { selectCycle } from '../AchievementConstants'
import {
  mockNominationList,
  mockNomineeCycleList,
} from '../../../test/data/NomineeListData'

const mockSetCurrentCycle = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NomineeListCycleFilter
      currentCycle={selectCycle}
      setCurrentCycle={mockSetCurrentCycle}
    />
  </div>
)

describe('Nominee List Cycle Filter', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          nomineeList: {
            isLoading: ApiLoadingState.succeeded,
            cyclesList: mockNomineeCycleList,
            nominationsList: mockNominationList,
          },
        },
      })
    })
    afterEach(cleanup)
    test('initial label and button is rendered', () => {
      const cycleSelect = screen.getByTestId('cycle-sel')
      expect(screen.getAllByTestId('cycle-opt')).toHaveLength(7)
      expect(cycleSelect).toHaveValue(selectCycle)
      expect(screen.getByTestId('export-btn')).toBeEnabled()
    })
    test('export button is working', () => {
      const button = screen.getByTestId('export-btn')
      userEvent.click(button)
    })
  })
})
