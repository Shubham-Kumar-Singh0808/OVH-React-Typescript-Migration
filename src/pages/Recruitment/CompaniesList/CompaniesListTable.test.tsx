import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CompaniesListTable from './CompaniesListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  CandidatesInfoList,
  CompaniesListResponse,
} from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

const mockSetData = jest.fn()

describe('candidate List without data', () => {
  beforeEach(() => {
    render(
      <CompaniesListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
      />,
      {
        preloadedState: {
          companiesList: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            companiesListResponseDetails: {} as CompaniesListResponse,
            companiesListData: [],
            CandidatesInfoListResponseDetails: {} as CandidatesInfoList,
            CandidatesInfoListData: [],
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
})
