import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import JobVacanciesTable from './JobVacanciesTable'
import { render, screen, waitFor } from '../../test/testUtils'
import { mockJobOpenings } from '../../test/data/jobOpeningsData'

describe('Job Openings Component', () => {
  beforeEach(() => {
    render(<JobVacanciesTable />, {
      preloadedState: {
        jobOpenings: {
          jobVacancies: mockJobOpenings,
        },
      },
    })
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Job Code' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Job Title' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Experience' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Job Description' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Position Open Date' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'No.of Vacancies' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Positions Closed' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Positions Vacant' }),
    ).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(6)
  })
  test('should open modal when clicking on job Description link', async () => {
    const linkElement = screen.getByTestId('job-description0')
    userEvent.click(linkElement)
    const description = screen.getAllByText(
      'This is a test record for testing purpose.',
    )
    await waitFor(() => {
      expect(description[0]).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    })
  })
})
