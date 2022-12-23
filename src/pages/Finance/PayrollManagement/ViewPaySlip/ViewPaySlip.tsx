import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const ViewPaySlip = (): JSX.Element => {
  const renderingPayslipData = useTypedSelector(
    reduxServices.payrollManagement.selectors.paySlipInfo,
  )

  return (
    <>
      {' '}
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableBody>
          {renderingPayslipData?.length > 0 &&
            renderingPayslipData?.map((payslipItem, index) => {
              return (
                <>
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <strong>Payslip</strong>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow key={index}>
                    <CTableDataCell>
                      <strong>
                        <br></br>
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell>
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
                      {payslipItem.name}
                    </CTableDataCell>
                    <CTableDataCell text-align="middle">
                      <br></br>
                    </CTableDataCell>
                    <CTableDataCell>
                      <strong>No of Days in the Month</strong>
                    </CTableDataCell>
                    <CTableDataCell>
                      {payslipItem.noOfDaysInMonth}
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell text-align="left">
                      <strong>Designation</strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      {payslipItem.designation}
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      <strong>
                        <br></br>
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell text-align="left">
                      <strong>Employee ID</strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      {payslipItem.employeeId}
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      <strong>
                        <u>LEAVES AVAILED</u>
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell text-align="left">
                      <strong>Date of Joining</strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      {payslipItem.joiningDate}
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      <strong>
                        <br></br>
                      </strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                  </CTableRow>

                  <CTableRow>
                    <CTableDataCell text-align="left">
                      <strong>Month</strong>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      {payslipItem.month}
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      <br></br>
                    </CTableDataCell>
                    <CTableDataCell text-align="left">
                      Medical Leave
                    </CTableDataCell>
                    <CTableDataCell text-align="center">
                      {payslipItem.medicliam}
                    </CTableDataCell>
                  </CTableRow>
                </>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ViewPaySlip
