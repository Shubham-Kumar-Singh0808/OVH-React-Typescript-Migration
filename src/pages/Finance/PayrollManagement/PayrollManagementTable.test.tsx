import '@testing-library/jest-dom'

import React from 'react'
import PayrollManagementTable from './PayrollManagementTable'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import { mockPaySLip } from '../../../test/data/payrollManagementData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetTogglePage = jest.fn()

describe('Payroll Management Table Component Testing', () => {
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
        isChecked={false}
        setIsChecked={mockSetTogglePage}
        setIsAllChecked={mockSetTogglePage}
        userDeleteAccess={true}
        userEditAccess={true}
      />,
      {
        preloadedState: {
          payrollManagement: {
            listSize: 1,
            isLoading: ApiLoadingState.succeeded,
            error: null,
            currentPaySlipData: mockPaySLip,
            paySlipInfo: [],
            paySlipList: { list: [], size: 0 },
            editPayslip: {} as CurrentPayslip,
            excelData: [],
            uplaodExcelFile: [],
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      },
    )
  })

  test('should render the Payroll Management Table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('Should be able to see table titles', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'ID' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'DOJ' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'A/C No.' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'G.Salary' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'V.Pay %' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'V.Pay' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'G.Salary after V.Pay' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Basic' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'HR' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'TA' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Other Allowance' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Absent' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'LOP' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Mediclaim' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'ESI' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'EPF' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Gratuity' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'S.Adv/Arrears/Other' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'ERC' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'TDS' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'P.Tax' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Meals Card' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Donation' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Arrears' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Incentive' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'N.Salary' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Remarks' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Month' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Year' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(35)
  })
})
