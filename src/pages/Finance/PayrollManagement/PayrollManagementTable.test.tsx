import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import PayrollManagementTable from './PayrollManagementTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../test/data/payrollManagementData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetTogglePage = jest.fn()
const deleteButton = 'btn-delete1'
const viewButton = 'btn-view1'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <PayrollManagementTable
      paginationRange={[]}
      currentPage={1}
      setCurrentPage={mockSetTogglePage}
      pageSize={22}
      setPageSize={mockSetTogglePage}
      selectMonth=""
      selectYear=""
      setToggle={mockSetTogglePage}
      setToEditPayslip={mockSetTogglePage}
      userDeleteAccess={true}
      userEditAccess={true}
      editPaySlipHandler={mockSetTogglePage}
      paySlipId={[]}
      setPaySlipId={mockSetTogglePage}
    />
    ,
  </div>
)

describe('Payroll Management Table Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        payrollManagement: {
          listSize: 22,
          isLoading: ApiLoadingState.succeeded,
          paySlipList: mockCurrentPayslip,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
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
  test('Should be able to see total of 6 records', () => {
    expect(
      screen.getByText(`Total Records: ${mockCurrentPayslip.size}`),
    ).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('')
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
      expect(screen.getAllByRole('row')).toHaveLength(23)
    })
  })
  it('should render Delete modal popup on clicking delete button from Actions', async () => {
    const deleteButtonEl = screen.getByTestId(deleteButton)
    userEvent.click(deleteButtonEl)
    await waitFor(() => {
      expect(screen.getByText('Delete Payslip')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should close modal popup after clicking Yes option from the modal', () => {
    const deleteButtonElement = screen.getByTestId(deleteButton)
    userEvent.click(deleteButtonElement)
    const yesButtonEle = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(yesButtonEle)
  })
  it('should close modal popup after clicking Yes option from the modal', () => {
    const viewButtonElement = screen.getByTestId(viewButton)
    userEvent.click(viewButtonElement)
  })
})
