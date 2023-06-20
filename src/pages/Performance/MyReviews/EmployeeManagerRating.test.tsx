import React from 'react'
import EmployeeManagerRating from './EmployeeManagerRating'
import { generateMyReviewTestId } from './MyReviewHelpers'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockAvgRatingsDTOs } from '../../../test/data/myReviewData'

const toRender = <EmployeeManagerRating />

describe('Employee Manager Rating', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        myReview: {
          appraisalForm: {
            manager1Name: 'Manager M',
            avgRatingsDtos: mockAvgRatingsDTOs,
          },
        },
      },
    })
  })
  afterEach(cleanup)
  screen.debug()

  test('data is rendered', () => {
    expect(
      screen.getByTestId(generateMyReviewTestId(`avgDTORatingManagerRating`)),
    ).toHaveTextContent('3.44')

    expect(
      screen.getAllByTestId(generateMyReviewTestId(`avgDTORatingDiv`)),
    ).toHaveLength(mockAvgRatingsDTOs.length)

    expect(
      screen.getAllByTestId(generateMyReviewTestId('avgDTORatingDiv'))[0],
    ).toHaveTextContent('Itadmin A')
  })
})
