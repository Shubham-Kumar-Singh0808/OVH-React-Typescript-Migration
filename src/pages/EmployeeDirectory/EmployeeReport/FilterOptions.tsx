import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CCol,
  CFormLabel,
  CFormCheck,
  CFormSelect,
  CRow,
  CButton,
  CInputGroup,
  CFormInput,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  EmploymentStatus,
  EmployeeReportOptionsProps,
} from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'

const FilterOptions = ({
  category,
  setCategory,
}: EmployeeReportOptionsProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const [searchInput, setSearchInput] = useState<string>('')

  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeReports.selectors.selectedEmploymentStatus,
  )

  const categoryOptions = [
    { label: 'Select Category', value: '' },
    { label: 'Working from Home', value: 'Home' },
    { label: 'Working from Office', value: 'Office' },
    { label: 'External Vendor', value: 'External Vendor' },
    { label: 'Employment Contract', value: 'Employment Contract' },
  ]

  const handleEmployeeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.employeeReports.actions.changeSelectedEmploymentStatus(
        event.target.value,
      ),
    )
  }

  const handleSearch = () => {
    dispatch(
      reduxServices.employeeReports.actions.setSearchEmployee(searchInput),
    )
  }

  return (
    <>
      <CRow>
        <CCol className="mt-1" sm={2} md={1} lg={1}>
          <CFormCheck
            type="radio"
            name="employmentStatus"
            value={EmploymentStatus.active}
            id="employmentActive"
            label="Active"
            defaultChecked={
              selectedEmploymentStatus === EmploymentStatus.active
            }
            onChange={handleEmployeeStatus}
            inline
          />
        </CCol>
        <CCol className="mt-1" sm={2} md={1} lg={1}>
          <CFormCheck
            type="radio"
            name="employmentStatus"
            value={EmploymentStatus.inactive}
            id="employmentInactive"
            label="Inactive"
            defaultChecked={
              selectedEmploymentStatus === EmploymentStatus.inactive
            }
            onChange={handleEmployeeStatus}
            inline
          />
        </CCol>
        <CCol sm={2} md={2} lg={1}>
          <CFormLabel className="mt-1">Select :</CFormLabel>
        </CCol>
        <CCol sm={4} md={2} lg={2}>
          <CFormSelect
            aria-label="Default select example"
            name="category"
            id="category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value)
            }}
          >
            {categoryOptions.map((opt, index) => (
              <option key={index} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol className="d-md-flex justify-content-end">
          <Link to={`/report2`}>
            <CButton color="info btn-ovh me-0">
              <i className="fa fa-eye  me-1"></i>Employee Designation info
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end mt-4">
        <CCol sm={6} md={4} lg={5} xl={4} xxl={4}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={handleSearch}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default FilterOptions
