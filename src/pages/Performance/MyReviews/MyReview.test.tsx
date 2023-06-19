import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import MyReview from './MyReview'
import {
  generateMyReviewTestId,
  getKpisOfKraByKraIndex,
  initialPerformanceRating,
  myReviewTestComments,
} from './MyReviewHelpers'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockCompletedEmployeeAppraisalForm,
  mockInitialEmployeeAppraisalForm,
  mockManagerSubmittedEmployeeAppraisalForm,
  mockMyReviewAuthenticatedUser,
  mockPerformanceRatings,
  mockReviewComments,
} from '../../../test/data/myReviewData'
import { MyReviewFormStatus } from '../../../types/Performance/MyReview/myReviewTypes'
import { initialMyReviewModal } from '../../../reducers/Performance/MyReview/myReviewSliceConstants'

const employeeAcknowledgeBtnId = generateMyReviewTestId('empAckBtn')
const employeeRequestDiscussionBtnId =
  generateMyReviewTestId('empReqDiscussBtn')
const employeeInitialSaveBtn = generateMyReviewTestId('empSaveBtn')
const employeeInitialSubmitBtn = generateMyReviewTestId('empSubmitBtn')

describe('Employee Review Form', () => {
  describe('initial employee testing for save functionality', () => {
    beforeEach(() => {
      render(<MyReview />, {
        preloadedState: {
          myReview: {
            appraisalForm: mockInitialEmployeeAppraisalForm,
            myReviewFormStatus: MyReviewFormStatus.saveForEmployee,
            performanceRatings: mockPerformanceRatings,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            isEmployeeSubmitButtonEnabled: false,
            modal: initialMyReviewModal,
          },
          authentication: {
            authenticatedUser: mockMyReviewAuthenticatedUser,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('description of kpi modal opened on clicking kpi name', () => {
      const kraIndex = 2
      const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
      act(() => {
        userEvent.click(openKpiBtn)
      })
      const chosenKpi = getKpisOfKraByKraIndex(
        mockInitialEmployeeAppraisalForm,
        kraIndex,
      )[0]
      const kpiName = screen.getByTestId(
        generateMyReviewTestId(`kpiName-${chosenKpi.id}`),
      )
      act(() => {
        userEvent.click(kpiName)
      })
      // modal opens and now content in it is tested
      expect(
        screen.getByTestId(generateMyReviewTestId('kpiDesModal-name')),
      ).toHaveTextContent(chosenKpi.name)
      expect(
        screen.getByTestId(generateMyReviewTestId('kpiDesModal-description')),
      ).toHaveTextContent(chosenKpi.description)
      expect(
        screen.getByTestId(generateMyReviewTestId('kpiDesModal-frequency')),
      ).toHaveTextContent(chosenKpi.frequency)
    })

    test('save functionality', () => {
      const saveBtn = screen.getByTestId(employeeInitialSaveBtn)
      const submitBtn = screen.getByTestId(employeeInitialSubmitBtn)

      // initial renders
      expect(saveBtn).toBeEnabled()
      expect(submitBtn).toBeDisabled()

      act(() => {
        // saving the progress by the employee (api call)
        userEvent.click(saveBtn)
      })
    })

    test('submit button functionality', () => {
      const submitBtn = screen.getByTestId(employeeInitialSubmitBtn)
      mockInitialEmployeeAppraisalForm.kra.forEach((kra, kraIndex) => {
        expect(submitBtn).toBeDisabled()
        //opening each kra
        const openKpiBtn = screen.getByTestId(`myReview-kraOpen-${kraIndex}`)
        act(() => {
          userEvent.click(openKpiBtn)
        })
        // entering value for all kpi of each kra
        kra.kpis.forEach((kpiItem) => {
          const ratingTestId = `${kpiItem.id}-empRating`
          const commentsTestId = `${kpiItem.id}-empComments`
          const mockRating = mockPerformanceRatings[2].rating.toString()
          const kpiRating = screen.getByTestId(
            generateMyReviewTestId(ratingTestId),
          )
          const kpiComments = screen.getByTestId(
            generateMyReviewTestId(commentsTestId),
          )
          // checking out kpi rating functionality
          expect(kpiRating).toHaveValue(
            initialPerformanceRating.rating.toString(),
          )
          act(() => {
            userEvent.selectOptions(kpiRating, mockRating)
          })
          expect(kpiRating).toHaveValue(mockRating)

          // checking out comments functionality
          expect(kpiComments).toHaveValue('')
          act(() => {
            fireEvent.change(kpiComments, {
              target: { value: myReviewTestComments },
            })
          })
          expect(kpiComments).toHaveValue(myReviewTestComments)
        })
      })

      expect(submitBtn).toBeEnabled()
      act(() => {
        userEvent.click(submitBtn)
      })
    })

    test('other components must not be visible', () => {
      // acknowledge and request discussion buttons are not visible
      expect(
        screen.queryByTestId(employeeAcknowledgeBtnId),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(employeeRequestDiscussionBtnId),
      ).not.toBeInTheDocument()
      // discussion comments is not visible
      expect(
        screen.queryByTestId(generateMyReviewTestId('empDiscussionInput')),
      ).not.toBeInTheDocument()
      // timeline is not visible
      expect(
        screen.queryByTestId(generateMyReviewTestId('discussionTimeline')),
      ).not.toBeInTheDocument()
    })
  })

  describe('manager submitted form', () => {
    // after the manager has submitted the form
    beforeEach(() => {
      render(<MyReview />, {
        preloadedState: {
          myReview: {
            appraisalForm: mockManagerSubmittedEmployeeAppraisalForm,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            myReviewFormStatus: MyReviewFormStatus.saveForEmployee,
            reviewComments: { size: 0, list: [] },
            modal: initialMyReviewModal,
          },
          authentication: {
            authenticatedUser: {
              employeeId: mockManagerSubmittedEmployeeAppraisalForm.employee.id,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('employee can read manager rating and comments', () => {
      const kraIndex = 2
      const kpi = getKpisOfKraByKraIndex(
        mockManagerSubmittedEmployeeAppraisalForm,
        kraIndex,
      )[0]
      const openKpiBtn = screen.getByTestId(
        generateMyReviewTestId(`kraOpen-${kraIndex}`),
      )
      act(() => {
        userEvent.click(openKpiBtn)
      })
      // reading the comments
      act(() => {
        userEvent.click(
          screen.getByTestId(
            generateMyReviewTestId(`${kpi.id}-managerCommentsReadonly`),
          ),
        )
      })
      const managerComments = kpi.managerCommentsDtos
        ? kpi.managerCommentsDtos[0].managerComments
        : ''
      expect(
        screen.getByText(managerComments ? managerComments : ''),
      ).toBeVisible()
    })

    test('acknowledge button functionality', () => {
      const acknowledgeButton = screen.getByTestId(
        generateMyReviewTestId('empAckBtn'),
      )
      expect(acknowledgeButton).toBeEnabled()
      act(() => {
        userEvent.click(acknowledgeButton)
      })
    })

    test('request discussion functionality', () => {
      // the request discussion comment functionality unit testing is done... so not testing it here
      // clicking the request discussion button
      const requestDiscussionBtn = screen.getByTestId(
        generateMyReviewTestId('empReqDiscussBtn'),
      )
      expect(requestDiscussionBtn).toBeEnabled()

      act(() => {
        userEvent.click(requestDiscussionBtn)
      })

      expect(
        screen.queryByTestId(generateMyReviewTestId('empReqDis-comments')),
      ).toBeVisible()
    })
  })

  describe('completed appraisal form', () => {
    beforeEach(() => {
      render(<MyReview />, {
        preloadedState: {
          myReview: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            appraisalForm: mockCompletedEmployeeAppraisalForm,
            reviewComments: mockReviewComments,
            modal: initialMyReviewModal,
            myReviewFormStatus: MyReviewFormStatus.saveForEmployee,
          },
          authentication: {
            authenticatedUser: {
              employeeId: mockCompletedEmployeeAppraisalForm.employee.id,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('review completed button rendered', () => {
      expect(
        screen.queryByTestId(employeeAcknowledgeBtnId),
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId(employeeRequestDiscussionBtnId),
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId(generateMyReviewTestId('reviewCompletedBtn')),
      ).toBeVisible()
    })
  })
})
