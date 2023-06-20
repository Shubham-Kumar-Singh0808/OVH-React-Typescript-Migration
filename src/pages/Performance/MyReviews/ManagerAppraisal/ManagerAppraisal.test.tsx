import React from 'react'
import userEvent from '@testing-library/user-event'
import ManagerAppraisal from './ManagerAppraisal'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockInitialManagerAppraisalForm,
  mockPerformanceRatings,
} from '../../../../test/data/myReviewData'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../../test/testUtils'
import { MyReviewFormStatus } from '../../../../types/Performance/MyReview/myReviewTypes'
import { initialMyReviewModal } from '../../../../reducers/Performance/MyReview/myReviewSliceConstants'
import {
  generateMyReviewTestId,
  getKpisOfKraByKraIndex,
  initialPerformanceRating,
  myReviewTestComments,
} from '../MyReviewHelpers'

const managerSaveBtnId = generateMyReviewTestId('managerSaveBtn')
const managerSubmitBtnId = generateMyReviewTestId('managerSubmitBtn')

describe('Manager Appraisal Render', () => {
  describe('initial manager save functionality', () => {
    // manager submitting for the first time
    beforeEach(() => {
      render(<ManagerAppraisal />, {
        preloadedState: {
          myReview: {
            appraisalForm: mockInitialManagerAppraisalForm,
            performanceRatings: mockPerformanceRatings,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            isManagerSubmitButtonEnabled: false,
            myReviewFormStatus: MyReviewFormStatus.saveForEmployee, //will automatically change because of logic
            modal: initialMyReviewModal,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('save functionality', () => {
      const saveBtn = screen.getByTestId(managerSaveBtnId)
      const submitBtn = screen.getByTestId(managerSubmitBtnId)

      // initial render
      expect(saveBtn).toBeEnabled()
      expect(submitBtn).toBeDisabled()

      act(() => {
        userEvent.click(saveBtn)
      })
    })

    test('submit button functionality', () => {
      const submitBtn = screen.getByTestId(managerSubmitBtnId)

      // initial
      expect(submitBtn).toBeDisabled()

      mockInitialManagerAppraisalForm.kra.forEach((kra, kraIndex) => {
        expect(submitBtn).toBeDisabled()
        const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
        act(() => {
          userEvent.click(openKpiBtn)
        })
        // entering the data for each kpi for manager
        kra.kpis.forEach((kpiItem) => {
          const chosenPerformanceRating =
            mockPerformanceRatings[3].rating.toString()
          const managerRating = screen.getByTestId(
            generateMyReviewTestId(`${kpiItem.id}-managerRating`),
          )
          const managerComments = screen.getByTestId(
            generateMyReviewTestId(`${kpiItem.id}-managerComments`),
          )

          // testing the rating
          expect(managerRating).toHaveValue(
            initialPerformanceRating.rating.toString(),
          )
          act(() => {
            userEvent.selectOptions(managerRating, chosenPerformanceRating)
          })
          expect(managerRating).toHaveValue(chosenPerformanceRating)

          // testing comments
          expect(managerComments).toHaveValue('')
          act(() => {
            fireEvent.change(managerComments, {
              target: { value: myReviewTestComments },
            })
          })
          expect(managerComments).toHaveValue(myReviewTestComments)
        })
      })

      expect(submitBtn).toBeEnabled()
      act(() => {
        userEvent.click(submitBtn)
      })
    })

    test('manager can read employee comments', () => {
      const kraIndex = 0
      const kpi = getKpisOfKraByKraIndex(
        mockInitialManagerAppraisalForm,
        kraIndex,
      )[0]
      const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
      act(() => {
        userEvent.click(openKpiBtn)
      })
      const kpiComments0 = screen.getByTestId(
        generateMyReviewTestId(`${kpi.id}-empCommentsReadonly`),
      )
      act(() => {
        userEvent.click(kpiComments0)
      })
      expect(
        screen.getByText(kpi.employeeFeedback ? kpi.employeeFeedback : ''),
      ).toBeVisible()
    })

    test('manager can see employee self rating and their rating', () => {
      const managerRating = screen.getByTestId(
        generateMyReviewTestId('managerRating'),
      )
      const employeeRating = screen.getByTestId(
        generateMyReviewTestId('employeeRating'),
      )

      expect(managerRating).toHaveTextContent('N/A')
      expect(employeeRating).toHaveTextContent(
        mockInitialManagerAppraisalForm.empAvgRating
          ? mockInitialManagerAppraisalForm.empAvgRating.toString()
          : 'N/A',
      )

      expect(
        screen.getByTestId(generateMyReviewTestId('employeeRatingName')),
      ).toHaveTextContent(
        `${mockInitialManagerAppraisalForm.employee.fullName} Rating:`,
      )

      expect(
        screen.getByTestId(generateMyReviewTestId('managerRatingName')),
      ).toHaveTextContent(
        `${mockInitialManagerAppraisalForm.manager1Name} Rating:`,
      )
    })
  })
})
