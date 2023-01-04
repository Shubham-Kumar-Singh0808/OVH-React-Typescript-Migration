import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import PaySlipExcelFileTable from './PaySlipExcelFileTable'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetPaySlipReportResponse,
  CurrentPayslip,
} from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const uploadBtn = 'upload-btn'
const clearButton = 'clear-btn'
const mockSetTogglePage = jest.fn()

describe('Payroll without data', () => {
  beforeEach(() => {
    render(
      <PaySlipExcelFileTable
        selectMonth={''}
        selectYear={''}
        currentPage={0}
        pageSize={0}
        setToggle={mockSetTogglePage}
      />,
      {
        preloadedState: {
          payrollManagement: {
            isLoading: ApiLoadingState.succeeded,
            error: null,
            currentPaySlipData: {} as GetPaySlipReportResponse,
            listSize: 0,
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
  afterEach(cleanup)
  test('should render payroll Management component with out crashing', () => {
    expect(screen.getByRole('button', { name: 'Upload File' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    expect(screen.getByTestId(uploadBtn)).toBeEnabled()
    expect(screen.getByTestId(clearButton)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })
})
