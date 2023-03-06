import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import LeadershipEnrollmentListFilterOptions from './LeadershipEnrollmentListFilterOptions'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockLeadershipDetails } from '../../../../test/data/LeadershipEnrollmentListData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeadershipEnrollmentListFilterOptions />
  </div>
)

const viewBtnId = 'view-btn-id'
const clearBtnId = 'clear-btn-id'

describe('Leadership Enrollment List Filter Options', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentList: {
            isLoading: ApiLoadingState.succeeded,
            leadershipList: mockLeadershipDetails,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('all labels are rendered', () => {
      expect(screen.getByTestId('date-label')).toHaveTextContent('Date:')
      expect(screen.getByTestId('status-label')).toHaveTextContent('Status:')
    })
    test('buttons are rendered', () => {
      expect(screen.getByTestId(viewBtnId)).toBeEnabled()
      expect(screen.getByTestId(clearBtnId)).toBeEnabled()
    })
    test('all options are correctly rendered', () => {
      expect(screen.getAllByTestId('date-opt')).toHaveLength(7)
      expect(screen.getAllByTestId('status-opt')).toHaveLength(3)
    })
    test('view button functionality', () => {
      const dateSelect = screen.getByTestId('date-sel')
      const statusSelect = screen.getByTestId('status-sel')

      userEvent.selectOptions(statusSelect, 'APPROVED')
      userEvent.selectOptions(dateSelect, 'Today')

      userEvent.click(screen.getByTestId(viewBtnId))
    })
    test('clear button functionality', () => {
      const dateSelect = screen.getByTestId('date-sel')
      const statusSelect = screen.getByTestId('status-sel')

      userEvent.selectOptions(statusSelect, 'APPROVED')
      userEvent.selectOptions(dateSelect, 'Today')

      userEvent.click(screen.getByTestId(clearBtnId))
    })
    test('date error', async () => {
      const dateSelect = screen.getByTestId('date-sel')
      userEvent.selectOptions(dateSelect, 'Custom')
      const dates = screen.getAllByPlaceholderText('dd/mm/yyyy')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], {
          target: { value: '12/07/2022' },
        }),
      )
      fireEvent.click(dates[1])
      await waitFor(() =>
        fireEvent.change(dates[1], {
          target: { value: '12/05/2022' },
        }),
      )
      expect(dates[1]).toHaveValue('05/12/2022')
      expect(screen.getByTestId(viewBtnId)).toBeDisabled()
    })
  })
})
