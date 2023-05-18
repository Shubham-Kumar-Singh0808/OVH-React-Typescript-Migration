import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ManufacturerListTable from './ManufacturerListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetAllManufacturerName } from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { mockManufacturerData } from '../../../test/data/ManufacturerListData'

const mockSetData = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <ManufacturerListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
      />,
      {
        preloadedState: {
          manufacturerList: {
            isLoading: ApiLoadingState.succeeded,
            manufacturerDetails: mockManufacturerData,
            getAllManufacturerName: {} as GetAllManufacturerName,
            listSize: 0,
          },
        },
      },
    )
  })
  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 20')).toBeInTheDocument()
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
    expect(screen.getByText('Stagging Test')).toBeInTheDocument()
    expect(screen.getByText('Pavani')).toBeInTheDocument()
  })
  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Manufacturer Name')).toBeInTheDocument()
    expect(screen.getByText('Last Updated by')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
