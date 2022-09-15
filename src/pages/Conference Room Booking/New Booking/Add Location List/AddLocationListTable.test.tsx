import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import AddLocationListTable from './AddLocationListTable'
import { render, screen } from '../../../../test/testUtils'

describe('Add Location List Table without data', () => {
  beforeEach(() => {
    render(<AddLocationListTable />)
  })
  afterEach(cleanup)

  test('should render the "Tracker" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Location Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(3)
  })
})
