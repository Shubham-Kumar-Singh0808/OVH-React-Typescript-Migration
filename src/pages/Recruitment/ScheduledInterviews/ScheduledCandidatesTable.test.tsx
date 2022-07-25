import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '../../../test/testUtils'
import ScheduledCandidatesTable from './ScheduledCandidatesTable'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.queryByText(mockManagerHiveActivityReport.list[i].id),
    ).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Manager Hive Activity Report Component Testing', () => {
  test('should render manager hive activity report component without crashing', async () => {
    render(
      <ScheduledCandidatesTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          hiveActivityReport: {
            managerHiveActivityReport: mockManagerHiveActivityReport,
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
