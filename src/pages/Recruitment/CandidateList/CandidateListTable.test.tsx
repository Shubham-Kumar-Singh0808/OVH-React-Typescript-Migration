import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CandidateListTable from './CandidateListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  country,
  CandidateLists,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import { mockSearchScheduledCandidate } from '../../../test/data/candidateListData'

const mockSetData = jest.fn()

describe('candidate List without data', () => {
  beforeEach(() => {
    render(
      <CandidateListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
        searchInput={''}
      />,
      {
        preloadedState: {
          candidateList: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            candidateDetails: {} as CandidateLists,
            allCandidateDetails: mockSearchScheduledCandidate.list,
            allCountryDetails: {} as country,
            empCountries: [],
            getAllTechnology: [],
          },
        },
      },
    )
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })

  test('should render  component with data', () => {
    expect(screen.getByText('vinesh.merugu@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('sunnymaish2212@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('Dell Boomi developer')).toBeInTheDocument()
  })
})
