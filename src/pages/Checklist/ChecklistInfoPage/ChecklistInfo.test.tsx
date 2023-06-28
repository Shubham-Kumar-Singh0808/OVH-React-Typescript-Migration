import React from 'react'
import ChecklistInfo from './ChecklistInfo'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  act,
} from '../../../test/testUtils'
import { mockChecklist } from '../../../test/data/ChecklistData'

const mockChecklistItem = mockChecklist.list[2]

describe('Checklist Info Page', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(<ChecklistInfo />, {
        preloadedState: {
          Checklist: {
            clickedChecklistTitle: mockChecklistItem,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('heading and content is displayed', () => {
      expect(screen.getByText(mockChecklistItem.title)).toBeVisible()
      expect(screen.getByText(mockChecklistItem.description)).toBeVisible()
    })
    test('back button functionality', () => {
      act(() => {
        fireEvent.click(screen.getByTestId('checkListInfoBackBtn'))
      })
    })
  })
})
