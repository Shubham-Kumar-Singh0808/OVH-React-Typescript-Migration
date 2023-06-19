import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
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
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'Admin  Rbt')
    userEvent.click(screen.getByTestId('multi-search-btn'))
  })
})
