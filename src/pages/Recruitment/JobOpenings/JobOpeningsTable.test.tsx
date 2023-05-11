import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import JobOpeningsTable from './JobOpeningsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockJobVacancies } from '../../../test/data/jobVacenciesData'

const mockSetData = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <JobOpeningsTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
        searchInput={''}
        selectRadioAction={''}
        setToggle={mockSetData}
        setEditJobInfo={mockSetData}
      />,
      {
        preloadedState: {
          jobVacancies: {
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
            getAllTechnology: [],
            getAllJobVacancies: mockJobVacancies.list,
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

  test('should render Add LocationList component with data', () => {
    expect(screen.getByText('BA09')).toBeInTheDocument()
    expect(screen.getByText('2-6')).toBeInTheDocument()
    expect(screen.getByText('Business Analyst')).toBeInTheDocument()
    expect(screen.getByText('19/06/2019')).toBeInTheDocument()
  })

  test('should be able to click  button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-delete10')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
  test('should be able to click edit button element', () => {
    const deleteBtnElement = screen.getByTestId('btn-edit10')
    expect(deleteBtnElement).toBeInTheDocument()
    userEvent.click(deleteBtnElement)
  })
})
