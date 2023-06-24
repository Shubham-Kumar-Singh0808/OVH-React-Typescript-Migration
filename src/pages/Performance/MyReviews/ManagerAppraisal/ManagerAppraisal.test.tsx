import React from 'react'
import userEvent from '@testing-library/user-event'
import ManagerAppraisal from './ManagerAppraisal'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockInitialManagerAppraisalForm,
  mockPerformanceRatings,
  myReviewManagerUserAccessToFeatures,
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
  sortKPIByAlphabeticalOrder,
  sortKRAByAlphabeticalOrder,
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
          userAccessToFeatures: {
            userAccessToFeatures: myReviewManagerUserAccessToFeatures,
          },
          authentication: {
            authenticatedUser: {
              employeeId: 2000, // random but not equal to employee id in the review form
            },
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

    test('incomplete kpi description save error', () => {
      const saveBtn = screen.getByTestId(managerSaveBtnId)
      const kraIndex = 1
      const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
      const kpi = getKpisOfKraByKraIndex(
        mockInitialManagerAppraisalForm,
        kraIndex,
      )[0]
      act(() => {
        userEvent.click(openKpiBtn)
      })
      const kpiComments = screen.getByTestId(
        generateMyReviewTestId(`${kpi.id}-managerComments`),
      )
      act(() => {
        fireEvent.change(kpiComments, 'lessthan 50 char')
      })
      act(() => {
        userEvent.click(saveBtn)
      })
    })

    test('submit button functionality', () => {
      const submitBtn = screen.getByTestId(managerSubmitBtnId)

      // initial
      expect(submitBtn).toBeDisabled()
      const sortedKRAs = sortKRAByAlphabeticalOrder(
        mockInitialManagerAppraisalForm.kra,
      )
      sortedKRAs.forEach((kra, kraIndex) => {
        expect(submitBtn).toBeDisabled()
        const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
        act(() => {
          userEvent.click(openKpiBtn)
        })
        const sortedKPIs = sortKPIByAlphabeticalOrder(kra.kpis)
        // entering the data for each kpi for manager
        sortedKPIs.forEach((kpiItem) => {
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

    test('close button functionality on top right', () => {
      const closeButton = screen.getByTestId(
        generateMyReviewTestId('delManagerCloseBtn'),
      )
      act(() => {
        userEvent.click(closeButton)
      })
      const submitButton = screen.getByTestId(
        generateMyReviewTestId('delManagerFinalSubmitBtn'),
      )
      const statusInput = screen.getByTestId(
        generateMyReviewTestId('delManagerStatusInp'),
      )
      const statusSummary = screen.getByTestId(
        generateMyReviewTestId('delManagerSummaryInp'),
      )

      expect(submitButton).toBeDisabled()

      expect(statusInput).toHaveValue('')
      act(() => {
        userEvent.selectOptions(statusInput, 'Relieved')
      })
      expect(statusInput).toHaveValue('Relieved')

      expect(statusSummary).toHaveValue('')
      act(() => {
        fireEvent.change(statusSummary, { target: { value: 'test' } })
      })
      expect(statusSummary).toHaveValue('test')

      expect(submitButton).toBeEnabled()
      act(() => {
        userEvent.click(submitButton)
      })
    })

    test('close button modal cancel functionality', () => {
      const closeButton = screen.getByTestId(
        generateMyReviewTestId('delManagerCloseBtn'),
      )
      act(() => {
        userEvent.click(closeButton)
      })
      act(() => {
        userEvent.click(
          screen.getByTestId(
            generateMyReviewTestId('delManagerCancelModalBtn'),
          ),
        )
      })
    })
  })
})
