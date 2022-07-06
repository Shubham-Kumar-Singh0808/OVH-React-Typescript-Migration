import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { EmployeeGetEmailTemplate } from '../../../types/Settings/MailConfiguration/employeemailConfigurationTypes'

const employeeEmailTemplate = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const initialEmployeeEmailTemplate = {} as EmployeeGetEmailTemplate
  const [employeeTemplate, setEmployeeTemplate] = useState(
    initialEmployeeEmailTemplate,
  )
  const employeeEmailTemplates = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplate,
  )
  const employeeEmailTemplateType = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplateTypes,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeMailTemplateTypes(),
    )
  }, [dispatch])

  console.log(employeeEmailTemplates)

  const handleTicketConfiguration = () => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeEmailTemplate({
        templateName: employeeTemplate.templateName,
        templateTypeId: employeeTemplate.templateTypeId,
      }),
    )
  }

  const onChangeEmailTemplateHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeeTemplate((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  console.log(employeeTemplate)
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
              id="templateTypeId"
              data-testid="form-select1"
              name="templateTypeId"
              value={employeeTemplate.templateTypeId}
              onChange={onChangeEmailTemplateHandler}
            >
              <option value={''}>Select Type</option>
              {employeeEmailTemplateType?.map((templateType, index) => (
                <option key={index} value={templateType.id}>
                  {templateType.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol sm={4}>
            <CFormInput
              type="text"
              id="templateName"
              name="templateName"
              placeholder="Search Text"
              value={employeeTemplate.templateName}
              onChange={onChangeEmailTemplateHandler}
            />
          </CCol>
          <CCol>
            <CButton
              className="btn-ovh me-1"
              color="success"
              onClick={handleTicketConfiguration}
            >
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
          <CCol>
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>
        </CRow>
        <br></br>
        <br></br>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Title</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Template</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employeeEmailTemplates?.map((emailTemplate, index) => (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {emailTemplate.templateType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {emailTemplate.templateName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {parse(emailTemplate.assetType)}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {emailTemplate.template}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton color="info btn-ovh me-2">
                    <i className="fa fa-pencil-square-o"></i>
                  </CButton>
                  <CButton color="danger btn-ovh me-2">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </OCard>
    </>
  )
}
export default employeeEmailTemplate
