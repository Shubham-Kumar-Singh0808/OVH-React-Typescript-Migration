import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeEmailTemplateTable from './EmployeeEmailTemplateTable'
import OCard from '../../../components/ReusableComponent/OCard'

const employeeEmailTemplate = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Email Templates"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Type:</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="technology"
              data-testid="form-select1"
              name="technology"
            >
              <option value={''}>Select Type</option>
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="Name"
              name="personName"
              placeholder="Search Text"
            />
          </CCol>
          <CCol>
            <CButton className="btn-ovh me-1" color="success">
              <i className="fa fa-search"></i>Search
            </CButton>
            <CButton color="warning " className="btn-ovh">
              Clear
            </CButton>
          </CCol>
          <CCol>
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Add Template
            </CButton>
          </CCol>
          {/* <CCol>
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>  */}
        </CRow>
        <br></br>
        <br></br>
        <EmployeeEmailTemplateTable />
      </OCard>
    </>
  )
}
export default employeeEmailTemplate
