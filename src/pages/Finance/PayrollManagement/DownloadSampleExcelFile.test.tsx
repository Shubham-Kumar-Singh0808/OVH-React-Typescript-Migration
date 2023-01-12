import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import DownloadSampleExcelFile from './DownloadSampleExcelFile'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../test/data/payrollManagementData'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'

describe('Payroll Management component with data', () => {
  beforeEach(() => {
    render(<DownloadSampleExcelFile />, {
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
    })
  })
  it('should be able to click downloadButtonElement ', () => {
    const downloadButtonElement = screen.getByTestId('download-Excel')
    userEvent.click(downloadButtonElement)
  })
})
