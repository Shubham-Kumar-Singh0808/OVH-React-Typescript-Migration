import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAssetsTable from './EmployeeAssetsTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockAssetsDetails } from '../../../test/data/employeeAssetsData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <EmployeeAssetsTable />
  </div>
)

describe('Ticket Approvals Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        employeeAssets: {
          employeeAssets: mockAssetsDetails,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockAssetsDetails.length),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render Assets table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(true)
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
})
