import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmployeeEmailTemplateTable from './EmailConfigTemplateTable'
import EditMailTemplate from './EditTemplate/EditMailTemplate'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import {
  EditEmployeeMailTemplate,
  EmployeeMailTemplate,
} from '../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import employeeMailConfigurationApi from '../../../middleware/api/Settings/MailConfiguration/employeeMailConfigurationApi'
import { downloadFile } from '../../../utils/helper'

const EmailConfigTemplate = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const initialEmployeeEmailTemplate = {} as EmployeeMailTemplate
  const [employeeTemplate, setEmployeeTemplate] = useState(
    initialEmployeeEmailTemplate,
  )
  const [editEmployeeTemplate, setEditEmployeeTemplate] = useState(
    {} as EditEmployeeMailTemplate,
  )
  const employeeMailTemplateType = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplateTypes,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeMailTemplateTypes(),
    )
  }, [dispatch])

  const handleEmailTemplate = () => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeMailTemplate({
        templateName: employeeTemplate.templateName,
        templateTypeId: employeeTemplate.templateTypeId,
      }),
    )
  }

  const editTemplateButtonHandler = ({
    id,
    templateName,
    template,
    templateTypeId,
    templateType,
    assetTypeId,
    assetType,
    email,
  }: EditEmployeeMailTemplate) => {
    setToggle('editTemplate')
    setEditEmployeeTemplate({
      id,
      templateName,
      template,
      templateTypeId,
      templateType,
      assetTypeId,
      assetType,
      email,
    })
  }
  const onChangeMailTemplateHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeeTemplate((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  useEffect(() => {
    if (employeeTemplate.templateTypeId || employeeTemplate.templateName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [employeeTemplate.templateTypeId, employeeTemplate.templateName])

  useEffect(() => {
    if (window.location.pathname === '/mailTemplates') {
      dispatch(
        reduxServices.employeeMailConfiguration.actions.clearEmployeeEmailTemplate(),
      )
    }
  }, [])

  const handleClearDetails = () => {
    setEmployeeTemplate({
      id: 0,
      templateName: '',
      template: '',
      templateTypeId: 0,
      templateType: '',
      assetTypeId: '',
      assetType: '',
      email: '',
    })
    dispatch(
      reduxServices.employeeMailConfiguration.actions.clearEmployeeEmailTemplate(),
    )
  }

  const handleExportMailTemplateData = async () => {
    const employeeMailTemplateDownload =
      await employeeMailConfigurationApi.exportEmployeeMailTemplateData({
        templateName: employeeTemplate.templateName,
        templateTypeId: employeeTemplate.templateTypeId,
      })

    downloadFile(employeeMailTemplateDownload, 'MailTemplateList.csv')
  }
  return (
    <>
      {toggle === '' && (
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
                  data-testid="template-select1"
                  name="templateTypeId"
                  value={employeeTemplate.templateTypeId}
                  onChange={onChangeMailTemplateHandler}
                >
                  <option value={''}>Select Type</option>
                  {employeeMailTemplateType?.map((templateType, index) => (
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
                  data-testid="search-test"
                  placeholder="Search Text"
                  value={employeeTemplate.templateName}
                  onChange={onChangeMailTemplateHandler}
                />
              </CCol>
              <CCol sm={2}>
                <CButton
                  className="btn-ovh me-1"
                  color="success"
                  onClick={handleEmailTemplate}
                  disabled={!isAddButtonEnabled}
                >
                  <i className="fa fa-search"></i>Search
                </CButton>
                <CButton
                  color="warning "
                  data-testid="clearTemplate-btn"
                  className="btn-ovh"
                  onClick={handleClearDetails}
                >
                  Clear
                </CButton>
              </CCol>
              <CCol sm={3}>
                <CButton
                  color="info btn-ovh me-1"
                  className="text-white"
                  data-testid="export-btn"
                  onClick={handleExportMailTemplateData}
                >
                  <i className="fa fa-plus me-1"></i>Click to Export
                </CButton>
                <Link to={`/addTemplate`}>
                  <CButton color="info btn-ovh me-1" className="text-white">
                    <i className="fa fa-plus me-1"></i>Add Template
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <EmployeeEmailTemplateTable
                employeeTemplate={employeeTemplate}
                editTemplateButtonHandler={editTemplateButtonHandler}
              />
            </CRow>
          </OCard>
        </>
      )}
      {toggle === 'editTemplate' && (
        <EditMailTemplate
          backButtonHandler={() => setToggle('')}
          editEmployeeTemplate={editEmployeeTemplate}
          setEditEmployeeTemplate={setEditEmployeeTemplate}
          employeeTemplate={employeeTemplate}
        />
      )}
    </>
  )
}
export default EmailConfigTemplate
