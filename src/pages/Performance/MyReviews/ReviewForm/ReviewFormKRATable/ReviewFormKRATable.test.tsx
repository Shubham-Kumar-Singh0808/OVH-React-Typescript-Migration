import React from 'react'
import userEvent from '@testing-library/user-event'
import ReviewFormKRATable from './ReviewFormKRATable'
import { act, cleanup, render, screen } from '../../../../../test/testUtils'
import { mockInitialEmployeeAppraisalForm } from '../../../../../test/data/myReviewData'

const toRender = (
  <ReviewFormKRATable appraisalForm={mockInitialEmployeeAppraisalForm} />
)

describe('Review Form KRA Table', () => {
  describe('intial render', () => {
    beforeEach(() => {
      render(toRender)
    })
    afterEach(cleanup)
    screen.debug()

    test('all column headers are rendered', () => {
      expect(screen.getByRole('columnheader', { name: '' })).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'KRA Name' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'Weightage(%)' }),
      ).toBeTruthy()
      expect(
        screen.getByRole('columnheader', { name: 'No.of KPIs' }),
      ).toBeTruthy()
    })

    test('correct number of kra is rendered', () => {
      expect(screen.getAllByTestId('myReview-kraRow')).toHaveLength(
        mockInitialEmployeeAppraisalForm.kra.length,
      )
    })

    test('kra is open and closing successfully', () => {
      const chosenIndex = 0
      const testKraOpenBtn = screen.getByTestId(
        `myReview-kraOpen-${chosenIndex}`,
      )
      act(() => {
        userEvent.click(testKraOpenBtn)
      })
      const testKraCloseBtn = screen.getByTestId(
        `myReview-kraClose-${chosenIndex}`,
      )
      // correct number of kpis are rendered
      expect(screen.getAllByTestId('myReview-kpiRow')).toHaveLength(
        mockInitialEmployeeAppraisalForm.kra[0].kpis.length,
      )

      // closing kpi
      act(() => {
        userEvent.click(testKraCloseBtn)
      })

      expect(
        screen.queryByTestId(`myReview-kraOpen-${chosenIndex}`),
      ).toBeVisible()
    })
  })
})
