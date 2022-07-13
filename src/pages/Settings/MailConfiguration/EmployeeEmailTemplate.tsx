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
import EmployeeEmailTemplateTable from './EmployeeEmailTemplateTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { EmployeeMailTemplate } from '../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import employeeMailConfigurationApi from '../../../middleware/api/Settings/MailConfiguration/employeeMailConfigurationApi'

const employeeEmailTemplate = (): JSX.Element => {
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()
  console.log()

  const initialEmployeeEmailTemplate = {} as EmployeeMailTemplate
  const [employeeTemplate, setEmployeeTemplate] = useState(
    initialEmployeeEmailTemplate,
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

  const handleClearDetails = () => {
    setEmployeeTemplate({
      templateName: '',
      template: '',
      templateTypeId: '',
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

    downloadFile(employeeMailTemplateDownload)
  }

  const downloadFile = (cvDownload: Blob | undefined) => {
    if (cvDownload) {
      const url = window.URL.createObjectURL(
        new Blob([cvDownload], {
          type: cvDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'MailTemplateList.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

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
        <br></br>
        <br></br>
        <EmployeeEmailTemplateTable employeeTemplate={employeeTemplate} />
      </OCard>
    </>
  )
}
export default employeeEmailTemplate
