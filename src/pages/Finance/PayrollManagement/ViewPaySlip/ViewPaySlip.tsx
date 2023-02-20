import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

const ViewPaySlip = ({
  selectedPaySlipDetails,
}: {
  selectedPaySlipDetails: CurrentPayslip
}): JSX.Element => {
  return (
    <>
      {' '}
      <CTable responsive className="popUp-alignment">
        <CTableBody>
          <>
            <CTableRow>
              <CTableDataCell className="text-center" colSpan={5}>
                <strong>PAYSLIP</strong>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong></strong>
              </CTableDataCell>
              <CTableDataCell colSpan={2}>
                <strong>Particulars</strong>
              </CTableDataCell>
              <CTableDataCell>
                <strong>Particulars</strong>
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableDataCell>
                <strong>Name of the Employee</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.name}
              </CTableDataCell>
              <CTableDataCell text-align="middle"></CTableDataCell>
              <CTableDataCell>
                <strong>No of Days in the Month</strong>
              </CTableDataCell>
              <CTableDataCell>
                {selectedPaySlipDetails.noOfDaysInMonth}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Designation</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.designation}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">
                <strong></strong>
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Employee ID</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.employeeId}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">
                <strong>
                  <u>LEAVES AVAILED</u>
                </strong>
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Date of Joining</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.joiningDate}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">
                <strong></strong>
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Month</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.month}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">Medical Leave</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.medicliam}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Year</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.year}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">Paid Leave</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.leaveWithOutPay}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>EPF No.</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.epf}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="left">LWP</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.leaveWithOutPay}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>UAN</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.uaNumber}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>PAN</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.panNumber}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Bank Name</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.bankName}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">Total Leaves</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.sumOfLeaves}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="left">
                <strong>Bank A/c No.</strong>
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.accountNo}
              </CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">
                Total Worked Days
              </CTableDataCell>
              <CTableDataCell text-align="left">
                {selectedPaySlipDetails.totalWorkingDays}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                <strong> SALARY DETAILS</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>Amount (Rs)</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>Deductions</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>Amount (Rs)</strong>
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">Basic Salary</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.basicSalary}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">TDS</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.taxDeductionScheme}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                House Rent Allowance
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.houseRentAllowance}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">
                Professional Tax
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.professionalTax}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                Transport Allowance
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.transportAllowance}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">Variable Pay</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.variablePay}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                Other Allowance
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.otherAllowance}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">
                Leave without pay
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.leaveWithOutPay}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">Arrears</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.arrears}
              </CTableDataCell>
              <CTableDataCell text-align="center">0</CTableDataCell>
              <CTableDataCell text-align="center">EPF</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.epf}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                ESI by Employer
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.esi}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">ESI</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.esi}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">Variable pay</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.variablePay}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">Mediclaim</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.medicliam}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">Incentives</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.incentive}
              </CTableDataCell>
              <CTableDataCell text-align="center">-</CTableDataCell>
              <CTableDataCell text-align="center">ERC</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.erc}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">Advances</CTableDataCell>
              <CTableDataCell text-align="center">500</CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">Gratuity</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.gratuity}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">Meals Card</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.mealsCard}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">Donation</CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.donation}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center">
                <strong> Gross Salary</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>{selectedPaySlipDetails.grossSalary}</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>0</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>Total Deductions</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                {selectedPaySlipDetails.totalDeductions}
              </CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center"></CTableDataCell>
            </CTableRow>

            <CTableRow>
              <CTableDataCell text-align="center"></CTableDataCell>
              <CTableDataCell text-align="center">
                <strong></strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong></strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>NET PAY</strong>
              </CTableDataCell>
              <CTableDataCell text-align="center">
                <strong>{selectedPaySlipDetails.netSalary}</strong>
              </CTableDataCell>
            </CTableRow>
          </>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ViewPaySlip
