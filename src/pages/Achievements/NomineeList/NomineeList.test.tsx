import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NomineeList from './NomineeList'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockNominationList,
  mockNomineeCycleList,
} from '../../../test/data/NomineeListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NomineeList />
  </div>
)

describe('Nominee List', () => {
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
    test('Heading is shown', () => {
      expect(screen.getByRole('table')).toBeVisible()
    })
  })
})
