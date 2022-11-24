import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const Payslips = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectYear = useTypedSelector(
    reduxServices.paySlips.selectors.payslipsList,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  console.log(selectYear)

  useEffect(() => {
    dispatch(
      reduxServices.paySlips.employeePaySlips({
        empId: Number(employeeId),
        year: 2022,
      }),
    )
  }, [dispatch])

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
            >
              {selectYear.length > 0 &&
                selectYear?.map((year, index) => (
                  <option key={index} value={year.empId}>
                    {year.year}
                  </option>
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
            {selectYear &&
              selectYear?.length > 0 &&
              selectYear?.map((year, index) => {
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
                          color="info"
                          className="btn-ovh-employee-list"
                        >
                          <i className="glyphicon glyphicon-save"> </i>
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
            <p>
              <strong>Total Records: {selectYear.length}</strong>
            </p>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default Payslips
