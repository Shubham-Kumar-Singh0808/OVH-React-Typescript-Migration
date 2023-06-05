import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import SQAAuditReportTable from './SQAAuditReportTable'
import { render, screen, waitFor, cleanup } from '../../test/testUtils'
import { mockSQAAuditReport } from '../../test/data/sqaAuditReportData'
import { mockUserAccessToFeaturesData } from '../../test/data/userAccessToFeaturesData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <SQAAuditReportTable
      paginationRange={[1, 2, 3]}
      currentPage={1}
      setCurrentPage={mockSetCurrentPage}
      pageSize={20}
      setPageSize={mockSetPageSize}
    />
    ,
  </div>
)

describe('SQAAuditReportTable Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        sqaAuditReport: {
          getSQAAuditReport: mockSQAAuditReport,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockSQAAuditReport.size),
    ).toBeInTheDocument()
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render SQAAuditReportTable component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(23)
    })
  })
})
