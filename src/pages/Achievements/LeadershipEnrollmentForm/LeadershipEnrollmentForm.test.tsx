import '@testing-library/jest-dom'

import React from 'react'
import LeadershipEnrollmentForm from './LeadershipEnrollmentForm'
import { cleanup, render, screen } from '../../../test/testUtils'
import {
  mockEmployeeDetails1,
  mockEmployeeDetails2,
} from '../../../test/data/LeadershipEnrollmentFormData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeadershipEnrollmentForm />
  </div>
)

describe('Leadership Enrollment Form', () => {
  describe('duplicate=false render', () => {
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

    test('heading is rendered', () => {
      expect(screen.getByText('Leadership Registration')).toBeVisible()
    })

    test('all questions are rendered', () => {
      expect(screen.getAllByTestId('test-question-check')).toHaveLength(9)
    })
  })

  describe('duplicate=true render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentForm: {
            isLoading: ApiLoadingState.succeeded,
            employeeDetails: mockEmployeeDetails2,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('error message displayed', () => {
      expect(
        screen.getByText('Sorry! Your Form is Already Submitted'),
      ).toBeVisible()
    })
  })
})
