import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import ScheduledInterviewsTable from './ScheduledInterviewsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockScheduledCandidatesData } from '../../../test/data/scheduledInterviewsData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockScheduledCandidatesData.list[i].candidateName),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Scheduled Interviews Table Component Testing', () => {
  test('should render scheduled interviews table component without crashing', async () => {
    render(
      <ScheduledInterviewsTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
        isTheadShow={true}
      />,
      {
        preloadedState: {
          scheduledInterviews: {
            scheduledCandidates: mockScheduledCandidatesData,
            scheduledCandidatesForEmployee: mockScheduledCandidatesData,
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
