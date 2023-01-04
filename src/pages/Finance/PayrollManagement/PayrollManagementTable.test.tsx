import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import PayrollManagementTable from './PayrollManagementTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import { mockCurrentPayslip } from '../../../test/data/payrollManagementData'

const mockSetTogglePage = jest.fn()

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <PayrollManagementTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        selectMonth=""
        selectYear=""
        setToggle={mockSetTogglePage}
        setToEditPayslip={mockSetTogglePage}
        isAllChecked={true}
        isChecked={true}
        setIsChecked={mockSetTogglePage}
        setIsAllChecked={mockSetTogglePage}
      />,
      {
        preloadedState: {
          payrollManagement: {
            listSize: 20,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            currentPaySlipData: mockCurrentPayslip,
            paySlipInfo: [],
            paySlipList: { list: [], size: 0 },
            editPayslip: {} as CurrentPayslip,
            excelData: [],
            uplaodExcelFile: [],
          },
        },
      },
    )
  })
  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Designation')).toBeInTheDocument()
    expect(screen.getByText('DOJ')).toBeInTheDocument()
    expect(screen.getByText('A/C No.')).toBeInTheDocument()
    expect(screen.getByText('G.Salary')).toBeInTheDocument()
    expect(screen.getByText('V.Pay %')).toBeInTheDocument()
    expect(screen.getByText('V.Pay')).toBeInTheDocument()
    expect(screen.getByText('G.Salary after V.Pay')).toBeInTheDocument()
    expect(screen.getByText('Basic')).toBeInTheDocument()
    expect(screen.getByText('HR')).toBeInTheDocument()
    expect(screen.getByText('TA')).toBeInTheDocument()
    expect(screen.getByText('Other Allowance')).toBeInTheDocument()
    expect(screen.getByText('Absent')).toBeInTheDocument()
    expect(screen.getByText('LOP')).toBeInTheDocument()
    expect(screen.getByText('Mediclaim')).toBeInTheDocument()
    expect(screen.getByText('ESI')).toBeInTheDocument()
    expect(screen.getByText('EPF')).toBeInTheDocument()
    expect(screen.getByText('Gratuity')).toBeInTheDocument()
    expect(screen.getByText('S.Adv/Arrears/Other')).toBeInTheDocument()
    expect(screen.getByText('ERC')).toBeInTheDocument()
    expect(screen.getByText('TDS')).toBeInTheDocument()
    expect(screen.getByText('P.Tax')).toBeInTheDocument()
    expect(screen.getByText('Meals Card')).toBeInTheDocument()
    expect(screen.getByText('Donation')).toBeInTheDocument()
    expect(screen.getByText('Arrears')).toBeInTheDocument()
    expect(screen.getByText('Incentive')).toBeInTheDocument()
    expect(screen.getByText('VP Payable ')).toBeInTheDocument()
    expect(screen.getByText('N.Salary')).toBeInTheDocument()
    expect(screen.getByText('Remarks')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
    expect(screen.getByText('Year')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })

  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 20')).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render employee Accounts table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
})
