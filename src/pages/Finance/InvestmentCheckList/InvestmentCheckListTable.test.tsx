import '@testing-library/jest-dom'
import React from 'react'
import InvestmentCheckListTable from './InvestmentCheckListTable'
import { cleanup, render, screen } from '../../../test/testUtils'

describe('Investment CheckList Table Component Testing without data', () => {
  beforeEach(() => {
    render(<InvestmentCheckListTable />)
  })
  afterEach(cleanup)
  test('should render the "Investment CheckList" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Sections' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Max-Limit' })).toBeTruthy()
  })
})
