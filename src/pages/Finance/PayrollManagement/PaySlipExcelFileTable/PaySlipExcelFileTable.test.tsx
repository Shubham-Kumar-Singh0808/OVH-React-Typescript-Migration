import '@testing-library/jest-dom'
import React from 'react'
import { cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PaySlipExcelFileTable from './PaySlipExcelFileTable'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetPaySlipReportResponse,
  CurrentPayslip,
} from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const uploadBtnId = 'upload-btn'
const clearButtonId = 'clear-btn'
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
        setExcelTable={mockSetTogglePage}
        setClearFile={mockSetTogglePage}
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
    expect(screen.getByTestId(uploadBtnId)).toBeEnabled()
    expect(screen.getByTestId(clearButtonId)).toBeEnabled()
  })
  test('should render clear button', () => {
    const clearButton = screen.getByTestId('clear-btn')
    expect(clearButton).toBeEnabled()
  })
  test('should be able to click Add button element', () => {
    const uploadBtn = screen.getByRole('button', { name: 'Upload File' })
    userEvent.click(uploadBtn)
    expect(uploadBtn).toBeInTheDocument()
  })
  test('should render  Configuration  screen and Allocate button without crashing', () => {
    const uploadButton = screen.getByTestId(uploadBtnId)
    expect(uploadButton).toBeInTheDocument()
    userEvent.click(uploadButton)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(2)
  })
  test('should render  Configuration  screen and Allocate button without crashing', () => {
    const clearButton = screen.getByTestId(clearButtonId)
    expect(clearButton).toBeInTheDocument()
    userEvent.click(clearButton)
    expect(mockSetTogglePage).toHaveBeenCalledTimes(3)
  })
})
