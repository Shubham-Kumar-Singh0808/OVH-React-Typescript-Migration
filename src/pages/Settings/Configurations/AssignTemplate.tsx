import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import AssignTemplateTable from './AssignTemplateTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const AssignTemplate = (): JSX.Element => {
  const [selectDepartment, setSelectDepartment] = useState('')
  const [selectDesignation, setSelectDesignation] = useState('')

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const dispatch = useAppDispatch()

  const designationId = useTypedSelector(
    reduxServices.assignTemplate.selectors.departmentID,
  )

  useEffect(() => {
    // dispatch(reduxServices.assignTemplate.getDesignationDeptId())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Assign Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/appraisalCycle`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Appraisal Title:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="appraisalTitle"
                type="text"
                id="appraisalTitle"
                size="sm"
                name="appraisalTitle"
              />
            </CCol>
          </CRow>

          <CRow className="mt-4 mb-4">
            <CCol sm={3} className="text-end">
              <CFormLabel className="mt-1">
                Department:
                <span className={selectDepartment ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="department"
                data-testid="form-select1"
                name="department"
                value={selectDepartment}
                onChange={(e) => {
                  setSelectDepartment(e.target.value)
                }}
              >
                <option value={''}>Select Department</option>
                {designationId.map((department, index) => (
                  <option key={index} value={department.departmentId}>
                    {department.departmentName}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mt-4 mb-4">
            <CCol sm={3} className="text-end">
              <CFormLabel className="mt-1">
                Designation:
                <span className={selectDesignation ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="designation"
                data-testid="form-select1"
                name="designation"
                value={selectDesignation}
                onChange={(e) => {
                  setSelectDesignation(e.target.value)
                }}
              >
                <option value={''}>Select Designation</option>
              </CFormSelect>
            </CCol>
          </CRow>
        </CForm>
        <AssignTemplateTable />
      </OCard>
    </>
  )
}

export default AssignTemplate
