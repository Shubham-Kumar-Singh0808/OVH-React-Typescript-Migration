import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NomineeListCycleFilter from './NomineeListCycleFilter'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockAchievementTypeList } from '../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { selectCycle } from '../AchievementConstants'
import { mockNomineeCycleList } from '../../../test/data/NomineeListData'

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
          },
        },
      })
    })
    afterEach(cleanup)
    test('recall of value', () => {
      const cycleSelect = screen.getByTestId('cycle-sel')
      expect(cycleSelect).toHaveValue(selectCycle)
      //expect(mockSetCurrentCycle).toHaveBeenCalled()
    })
  })
})
