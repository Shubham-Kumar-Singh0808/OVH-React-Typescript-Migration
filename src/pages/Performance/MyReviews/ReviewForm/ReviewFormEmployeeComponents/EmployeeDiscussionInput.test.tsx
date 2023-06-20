import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeDiscussionInput from './EmployeeDiscussionInput'
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '../../../../../test/testUtils'
import { TextDanger, TextWhite } from '../../../../../constant/ClassName'
import {
  generateMyReviewTestId,
  myReviewTestComments,
} from '../../MyReviewHelpers'

const toRender = <EmployeeDiscussionInput />

describe('Employee Discussion Input', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          myReview: {
            appraisalForm: {
              id: 1,
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('submit discussion functionality', () => {
      const commentsAsterix = screen.getByTestId('myRev-empReqDis-asterix')
      const comments = screen.getByTestId(
        generateMyReviewTestId('empReqDis-comments'),
      )
      const submitButton = screen.getByTestId('myRev-empReqDis-submitBtn')

      // initial renders
      expect(commentsAsterix).toHaveClass(TextDanger)
      expect(comments).toHaveValue('')
      expect(submitButton).toBeDisabled()

      // writing comments
      act(() => {
        fireEvent.change(comments, { target: { value: myReviewTestComments } })
      })
      expect(commentsAsterix).toHaveClass(TextWhite)
      // checking the character length
      expect(
        screen.getByTestId('myRev-empReqDis-commentLen'),
      ).toHaveTextContent(`${myReviewTestComments.length} / 250`)

      // button is enabled
      expect(submitButton).toBeEnabled()

      act(() => {
        userEvent.click(submitButton)
      })
    })
  })
})
