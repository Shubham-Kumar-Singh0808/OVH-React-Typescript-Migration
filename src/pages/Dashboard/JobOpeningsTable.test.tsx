import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import JobOpeningsTable from './JobOpeningsTable'
import { render, screen, waitFor } from '../../test/testUtils'
import { mockJobOpenings } from '../../test/data/jobOpeningsData'

describe('Job Openings Component', () => {
  beforeEach(() => {
    render(<JobOpeningsTable />, {
      preloadedState: {
        jobOpenings: {
          jobVacancies: mockJobOpenings,
        },
      },
    })
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'From Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'To Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Days' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Comments' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Manager Comments' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Approved By' }),
    ).toBeTruthy()
  })
  test('should render cancel button if employee leave status is `Pending Approval`', () => {
    const cancelButton = screen.getByTestId('cancel-btn2')
    userEvent.click(cancelButton)
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(6)
  })
  test('should open modal when clicking on employee comments link', async () => {
    const linkElement = screen.getByTestId('emp-comments2')
    userEvent.click(linkElement)
    const empComment = screen.getAllByText('requesting for leave')
    await waitFor(() => {
      expect(empComment[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
  test('should open modal when clicking on manager comments link', async () => {
    const linkElement = screen.getByTestId('mgr-comments1')
    userEvent.click(linkElement)
    const mgrComment = screen.getAllByText('Approved.')
    await waitFor(() => {
      expect(mgrComment[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
})
