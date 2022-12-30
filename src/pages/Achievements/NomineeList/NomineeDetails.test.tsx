import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import NomineeDetails from './NomineeDetails'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockNomineeDetails } from '../../../test/data/NomineeListData'
import { selectRating } from '../AchievementConstants'

const mockSetViewNomination = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <NomineeDetails setViewNomination={mockSetViewNomination} />
  </div>
)

const addBtnId = 'add-btn-id'
const clearBtnId = 'clear-btn-id'

const ratingSelectId = 'rating-select'
const statusSelectId = 'status-select'

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
    test('form buttons are rendered', () => {
      expect(screen.getByTestId(clearBtnId)).toBeEnabled()
    })
    test('basic details are rendered', () => {
      const empNameLabel = screen.getByTestId('empName-label')
      expect(empNameLabel).toBeVisible()
      expect(empNameLabel).toHaveTextContent('Employee Name:')

      const achTypeLabel = screen.getByTestId('achType-label')
      expect(achTypeLabel).toBeVisible()
      expect(achTypeLabel).toHaveTextContent('Achievement Type:')

      const cycleLabel = screen.getByTestId('cycle-label')
      expect(cycleLabel).toBeVisible()
      expect(cycleLabel).toHaveTextContent('Cycle:')

      const fromMonthLabel = screen.getByTestId('fromMonth-label')
      expect(fromMonthLabel).toBeVisible()
      expect(fromMonthLabel).toHaveTextContent('From Month:')

      const toMonthLabel = screen.getByTestId('toMonth-label')
      expect(toMonthLabel).toBeVisible()
      expect(toMonthLabel).toHaveTextContent('To Month:')

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
    test('Number of questions and answers are correctly rendered', () => {
      expect(screen.getAllByTestId('inc-question')).toHaveLength(3)
      expect(screen.getAllByTestId('inc-answers')).toHaveLength(3)
    })
    test('form labels are correctly rendered', () => {
      const ratingLabel = screen.getByTestId('rating-label')
      const commentsLabel = screen.getByTestId('comments-label')
      const statusLabel = screen.getByTestId('status-label')
      expect(ratingLabel).toBeVisible()
      expect(commentsLabel).toBeVisible()
      expect(statusLabel).toBeVisible()

      expect(ratingLabel).toHaveTextContent('Rating:')
      expect(commentsLabel).toHaveTextContent('Comments:')
      expect(statusLabel).toHaveTextContent('Status:')
    })
    test('form select options are correctly rendered', () => {
      expect(screen.getAllByTestId('rating-options')).toHaveLength(12)
      expect(screen.getAllByTestId('status-options')).toHaveLength(3)
    })
    test('form is correctly filled', () => {
      const ratingSelect = screen.getByTestId(ratingSelectId)
      const statusSelect = screen.getByTestId(statusSelectId)
      expect(ratingSelect).toHaveValue('3 - Good')
      expect(statusSelect).toHaveValue('Not Selected')

      userEvent.selectOptions(ratingSelect, '9 - Excellent')
      expect(ratingSelect).toHaveValue('9 - Excellent')
      expect(screen.getByTestId(addBtnId)).toBeEnabled()

      userEvent.selectOptions(statusSelect, 'Selected')
      expect(statusSelect).toHaveValue('Selected')

      userEvent.click(screen.getByTestId(addBtnId))
      expect(screen.findByText('Nominee Updated Successfully')).toBeTruthy()
    })
    test('clear button is working', () => {
      const ratingSelect = screen.getByTestId(ratingSelectId)
      const statusSelect = screen.getByTestId(statusSelectId)

      userEvent.click(screen.getByTestId(clearBtnId))
      expect(ratingSelect).toHaveValue(selectRating)
      expect(statusSelect).toHaveValue('Select Status')
    })
    test('pass description to test input value', () => {
      render(
        <CKEditor
          initData={
            process.env.JEST_WORKER_ID !== undefined && (
              <b className="ng-binding">
                CoreUI is the fastest way to build a modern dashboard for any
                platforms, browser, or device. A complete UI Kit that allows you
                to quickly build eye-catching, high-quality, high-performance
                responsive applications.
              </b>
            )
          }
        />,
      )
    })
  })
})
