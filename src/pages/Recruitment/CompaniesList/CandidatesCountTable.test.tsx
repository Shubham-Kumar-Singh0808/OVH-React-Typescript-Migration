import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import CandidatesCountTable from './CandidatesCountTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockCompaniesListTotalInfo,
  mockEmployeeCandidateCount,
} from '../../../test/data/CompaniesData'

const mockSetData = jest.fn()

describe('Candidates List without data', () => {
  beforeEach(() => {
    render(
      <CandidatesCountTable
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
            companiesListResponseDetails: mockCompaniesListTotalInfo.list,
            companiesListData: mockCompaniesListTotalInfo.list,
            CandidatesInfoListResponseDetails: mockEmployeeCandidateCount.list,
            CandidatesInfoListData: mockEmployeeCandidateCount.list,
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
    expect(screen.getByText('Kanchumarthi Jagadeesh')).toBeInTheDocument()
    expect(screen.getByText('Test Testing')).toBeInTheDocument()
    expect(screen.getByText('React Developerg53535')).toBeInTheDocument()
    expect(screen.getByText('RJS04')).toBeInTheDocument()
    expect(screen.getByText('jagadeesh kanc')).toBeInTheDocument()
  })
})
