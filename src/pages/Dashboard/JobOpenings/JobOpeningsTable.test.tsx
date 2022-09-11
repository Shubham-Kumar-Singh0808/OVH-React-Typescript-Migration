import React from 'react'
import JobOpeningsTable from './JobOpeningsTable'
import { render, screen } from '../../../test/testUtils'

describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(<JobOpeningsTable />, {
      preloadedState: {},
    })
  })
  test('should render the "JobOpenings" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Job Code' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Job Title' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Experience' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Job Description' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Position open date' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Position expiry date' }),
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
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
})
