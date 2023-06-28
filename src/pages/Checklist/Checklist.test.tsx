import React from 'react'
import Checklist from './Checklist'
import { initialChecklistItem } from './ChecklistHelpers'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { mockChecklist } from '../../test/data/ChecklistData'
import { fireEvent, render, cleanup, screen, act } from '../../test/testUtils'

describe('Checklist', () => {
  describe('rendered', () => {
    beforeEach(() => {
      render(<Checklist />, {
        preloadedState: {
          Checklist: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            incomingChecklist: mockChecklist,
            checklistParams: { endIndex: 20, startIndex: 0 },
            clickedChecklistTitle: initialChecklistItem,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('checklist info settings button', () => {
      act(() => {
        fireEvent.click(screen.getByTestId('checkInfoSettingsBtn'))
      })
    })
  })
})
