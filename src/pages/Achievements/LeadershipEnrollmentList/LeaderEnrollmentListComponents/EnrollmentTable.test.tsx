import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EnrollmentTable from './EnrollmentTable'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockLeadershipDetails } from '../../../../test/data/LeadershipEnrollmentListData'

const mockSetShowLeadershipDetails = jest.fn()
const mockSetCurrentIndex = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EnrollmentTable
      setCurrentIndex={mockSetCurrentIndex}
      setShowLeadershipDetails={mockSetShowLeadershipDetails}
    />
  </div>
)

describe('Enrollment Table', () => {
  describe('initial render', () => {
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

    test('table headers are rendered', () => {
      expect(
        screen.getByRole('columnheader', { name: 'Employee Id' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Employee Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Designation' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Applied Date' }),
      ).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
      expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    })
    test('number of rows are correctly rendered', () => {
      expect(screen.queryAllByRole('row')).toHaveLength(5)
    })
    test('action button rendered', () => {
      const button = screen.getByTestId('action-btn-2')
      userEvent.click(button)
      expect(mockSetCurrentIndex).toHaveBeenCalledTimes(1)
      expect(mockSetShowLeadershipDetails).toHaveBeenCalledTimes(1)
    })
  })
})
