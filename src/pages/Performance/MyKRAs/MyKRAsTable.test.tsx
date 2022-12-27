import '@testing-library/jest-dom'
import React from 'react'
import MyKRAsTable from './MyKRAsTable'
import { cleanup, render, screen } from '../../../test/testUtils'

describe('My KRAsTable Component Testing without data', () => {
  beforeEach(() => {
    render(<MyKRAsTable />)
  })
  afterEach(cleanup)
  test('should render the "My KRAs" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'KRA Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Percentage' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'No.of KPIs' }),
    ).toBeTruthy()
  })
})
