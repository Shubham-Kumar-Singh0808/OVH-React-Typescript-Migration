import '@testing-library/jest-dom'
import React from 'react'
import JobOpenings from './JobOpenings'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('Job Openings without data', () => {
  beforeEach(() => {
    render(<JobOpenings />, {
      preloadedState: {
        jobVacancies: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          getAllTechnology: [],
          getAllJobVacancies: [],
        },
      },
    })
  })
  test('should be able to render  Job Openings  Title', () => {
    expect(screen.getByText('Job Openings')).toBeInTheDocument()
  })
})
