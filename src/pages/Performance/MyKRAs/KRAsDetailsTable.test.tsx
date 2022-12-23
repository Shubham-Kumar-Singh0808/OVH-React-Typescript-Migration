import React from 'react'
import '@testing-library/jest-dom'
import KRAsDetailsTable from './KRAsDetailsTable'
import { render, screen } from '../../../test/testUtils'
import {
  mockIndividualKRAs,
  mockKPIsForIndividualKra,
} from '../../../test/data/MyKRAsData'

describe('My KRAs Details Table Component Testing', () => {
  beforeEach(() => {
    render(<KRAsDetailsTable />)
  })
  test('should render the "KRAs Details" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'KPI Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Frequency' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Target' })).toBeTruthy()
  })

  describe('KRAsDetailsTable Table Component with data', () => {
    beforeEach(() => {
      render(<KRAsDetailsTable />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1982',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'RAYBIZTECH',
              token: 'testing',
              designation: 'Software Engineer',
            },
          },
          myKRAs: {
            kras: mockIndividualKRAs,
            kpis: mockKPIsForIndividualKra,
          },
        },
      })
    })
    test('should render KRA details table component with data', () => {
      expect(screen.getByText('Customer Satisfaction')).toBeInTheDocument()
      expect(screen.getByText('Refrencability')).toBeInTheDocument()
      expect(screen.getByText('Customer Feedback')).toBeInTheDocument()
    })
  })
})
