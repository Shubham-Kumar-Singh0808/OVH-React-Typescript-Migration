import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CTableBody,
  CTableDataCell,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import payslipsApi from '../../../middleware/api/Finance/Payslips/payslipsApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeePayslips } from '../../../types/Finance/Payslips/payslipsTypes'
import { downloadFile } from '../../../utils/helper'

const Payslips = (): JSX.Element => {
  const [selectYear, setSelectYear] = useState<string>('')

  const currentYear = new Date().getFullYear()
  const previousYears = currentYear - 4
  const years = []
  for (let i = currentYear; i >= previousYears; i--) {
    years.push(i)
  }

  const dispatch = useAppDispatch()

  const paySlipsData = useTypedSelector(
    reduxServices.paySlips.selectors.payslipsList,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  useEffect(() => {
    if (selectYear) {
      dispatch(
        reduxServices.paySlips.employeePaySlips({
          empId: Number(employeeId),
          year: Number(selectYear),
        }),
      )
    }
  }, [selectYear])

  const handleDownloadPayslip = async (data: EmployeePayslips) => {
    const employeePayslipDownload = await payslipsApi.downloadPayslip({
      empId: data.empId,
      month: data.month,
      year: Number(data.year),
    })
    downloadFile(
      employeePayslipDownload,
      `${data.empId}_${data.month}_${Number(data.year)}.pdf`,
    )
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Download Payslips"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-3 mt-3">
          <CCol className="col-sm-2 control-label text-left">
            <CFormLabel className="mt-1">Select Year: </CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="Year"
              data-testid="form-select1"
              name="Year"
              value={selectYear}
              onChange={(e) => {
                setSelectYear(e.target.value)
              }}
            >
              {years.length > 0 &&
                years?.map((year, index) => (
                  <option key={index}>{year}</option>
                ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CTable
          striped
          responsive
          className="text-start text-left align-middle alignment"
        >
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">Year</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {paySlipsData &&
              paySlipsData?.length > 0 &&
              paySlipsData?.map((year, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{year.month}</CTableDataCell>
                    <CTableDataCell>{year.year}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Download">
                        <CButton
                          data-testid={`btn-download${index}`}
                          size="sm"
                          color="btn btn-info sh-btn-alignment"
                          className="btn-ovh-employee-list"
                          onClick={() => handleDownloadPayslip(year)}
                        >
                          <i className="fa fa-download sh-button"> </i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol xs={4}>
            <strong>
              {paySlipsData?.length
                ? `Total Records: ${paySlipsData.length}`
                : `No Records Found...`}
            </strong>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default Payslips
