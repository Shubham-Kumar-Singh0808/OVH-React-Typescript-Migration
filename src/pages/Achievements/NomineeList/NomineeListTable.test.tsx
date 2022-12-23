import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import NomineeListTable from './NomineeListTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockNominationList } from '../../../test/data/NomineeListData'

const mockSetViewButton = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NomineeListTable setViewNomination={mockSetViewButton} />
  </div>
)

describe('Nominee List Table', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          nomineeList: {
            isLoading: ApiLoadingState.succeeded,
            nominationsList: mockNominationList,
          },
        },
      })
    })
    afterEach(cleanup)
    test('Table is rendered', () => {
      expect(screen.getByRole('table')).toBeVisible()
    })
    test('Table heading are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Nominee Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Achievement Type' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Added By' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    })
    test('correct number of columns are rendered', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(4)
    })
    test('action button is rendered and functioning correctly', () => {
      const actionBtn = screen.getByTestId('action-btn1')
      expect(actionBtn).toBeEnabled()
      userEvent.click(actionBtn)
      expect(mockSetViewButton).toHaveBeenCalledTimes(1)
    })
  })
})
