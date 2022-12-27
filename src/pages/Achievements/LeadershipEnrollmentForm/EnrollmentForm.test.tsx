import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import EnrollmentForm from './EnrollmentForm'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeDetails1 } from '../../../test/data/LeadershipEnrollmentFormData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EnrollmentForm />
  </div>
)

const submitButtonId = 'submit-btn'
const clearButtonId = 'clear-btn'

describe('Enrollment Form', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentForm: {
            isLoading: ApiLoadingState.succeeded,
            employeeDetails: mockEmployeeDetails1,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('buttons are rendered', () => {
      expect(screen.getByTestId(submitButtonId)).toBeDisabled()
      expect(screen.getByTestId(clearButtonId)).toBeEnabled()
    })

    test('all labels are rendered', () => {
      expect(screen.getByTestId('emp-name-test')).toHaveTextContent(
        'Employee Name:',
      )
      expect(screen.getByTestId('emp-id-test')).toHaveTextContent(
        'Employee ID:',
      )
      expect(screen.getAllByTestId('test-question-check')).toHaveLength(9)
      expect(screen.getByTestId('reason-editor-test')).toHaveTextContent(
        'Please let us know why you want to be part of this elite group:*',
      )
      expect(screen.getByTestId('expectation-editor-test')).toHaveTextContent(
        'Please let us know any example where you really exceeded expectations:*',
      )

      expect(screen.getByTestId('acceptance-label')).toHaveTextContent(
        'I hereby declare that the above furnished information has been accepted by me',
      )
    })

    test('employee details rendered', () => {
      expect(screen.getByTestId('emp-name-value')).toHaveTextContent(
        'Pranav Gupta',
      )
      expect(screen.getByTestId('emp-id-value')).toHaveTextContent('2050')
    })

    test('select answers', () => {
      const yesRadios = screen.getAllByTestId('yes-radio') as HTMLInputElement[]
      const noRadios = screen.getAllByTestId('no-radio') as HTMLInputElement[]
      const acceptanceCheck = screen.getByTestId(
        'acceptance-check',
      ) as HTMLInputElement

      expect(acceptanceCheck.checked).toBe(false)

      userEvent.click(yesRadios[0])
      userEvent.click(noRadios[1])
      userEvent.click(yesRadios[2])
      userEvent.click(noRadios[3])
      userEvent.click(yesRadios[4])
      userEvent.click(noRadios[5])
      userEvent.click(yesRadios[6])
      userEvent.click(noRadios[7])
      userEvent.click(yesRadios[8])
      userEvent.click(acceptanceCheck)

      render(
        <CKEditor
          initData={
            process.env.JEST_WORKER_ID !== undefined && (
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McFlintlock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the uncountable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of de Finials
                Bonjour et Majorem (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular
              </p>
            )
          }
        />,
      )

      expect(screen.getByTestId(submitButtonId)).toBeDisabled()
    })

    test('clear button functionality', () => {
      const yesRadios = screen.getAllByTestId('yes-radio') as HTMLInputElement[]
      const noRadios = screen.getAllByTestId('no-radio') as HTMLInputElement[]
      const acceptanceCheck = screen.getByTestId(
        'acceptance-check',
      ) as HTMLInputElement

      expect(acceptanceCheck.checked).toBe(false)

      userEvent.click(yesRadios[0])

      expect(yesRadios[0].checked).toBe(true)
      expect(noRadios[0].checked).toBe(false)
      userEvent.click(acceptanceCheck)
      userEvent.click(screen.getByTestId(clearButtonId))

      expect(yesRadios[0].checked).toBe(false)
      expect(noRadios[0].checked).toBe(false)
      expect(acceptanceCheck.checked).toBe(false)
    })
  })
})
