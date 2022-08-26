import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProjectReportTable from './ProjectReportTable'
import { fireEvent, waitFor, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProjectReportData } from '../../../test/data/projectReportData'

describe('Project Report Table Testing', () => {
  beforeEach(() => {
    render(
      <ProjectReportTable
        paginationRange={[]}
        currentPage={1}
        setCurrentPage={jest.fn()}
        pageSize={1}
        setPageSize={jest.fn()}
      />,
      {
        preloadedState: {
          projectReport: {
            listSize: 28,
            isProjectLoading: ApiLoadingState.succeeded,
            isClientProjectLoading: ApiLoadingState.loading,
            ProjectDetails: {
              Projsize: mockProjectReportData.Projsize,
              Projs: mockProjectReportData.Projs,
            },
            Clients: mockProjectReportData.Projs,
          },
        },
      },
    )
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByText('Project Code')).toBeInTheDocument()
    expect(screen.getByText('Project Name')).toBeInTheDocument()
    expect(screen.getByText('Pricing Model')).toBeInTheDocument()
    expect(screen.getByText('Client')).toBeInTheDocument()
    expect(screen.getByText('Resources')).toBeInTheDocument()
    expect(screen.getByText('Project Manager')).toBeInTheDocument()
    expect(screen.getByText('Delivery Manager')).toBeInTheDocument()
    expect(screen.getByText('Start Date')).toBeInTheDocument()
    expect(screen.getByText('End Date')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 28')).toBeInTheDocument()
  })

  test('Should be able to see page size', async () => {
    const pageSize = screen.getByTestId('paginationTestID')

    await waitFor(() => {
      userEvent.selectOptions(pageSize, ['20'])
      expect(pageSize).toHaveValue('20')
    })
  })
})
