import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AddAchiever from './AddAchiever'
import { cleanup, fireEvent, render, screen } from '../../../test/testUtils'
import { mockAchievementTypeList } from '../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddAchiever />
  </div>
)

const addButtonId = 'add-ach-btn'

describe('Add Achiever Render', () => {
  describe('Initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('labels are rendered', () => {
      const name = screen.getByTestId('ach-name-label')
      expect(name).toHaveTextContent('Achievement Type Name')
    })
    test('details entered successfully', () => {
      const achOptions = screen.getAllByTestId('ach-name-opt')
      expect(achOptions).toHaveLength(11)
    })
    test('add button is rendered', () => {
      const addBtn = screen.getByTestId(addButtonId)
      expect(addBtn).toBeEnabled()
      userEvent.click(addBtn)
    })
  })
})
