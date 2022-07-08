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
  CLink,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import parse from 'html-react-parser'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { EmployeeGetMailTemplate } from '../../../types/Settings/MailConfiguration/employeeMailConfigurationTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import employeeMailConfigurationApi from '../../../middleware/api/Settings/MailConfiguration/employeeMailConfigurationApi'

const employeeEmailTemplate = (): JSX.Element => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [emailTemplateModel, setEmailTemplateModel] = useState<string>('')

  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const initialEmployeeEmailTemplate = {} as EmployeeGetMailTemplate
  const [employeeTemplate, setEmployeeTemplate] = useState(
    initialEmployeeEmailTemplate,
  )

  const employeeMailTemplates = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplate,
  )

  const employeeMailTemplateType = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplateTypes,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeMailConfiguration.getEmployeeMailTemplateTypes(),
    )
  }, [dispatch])

  const handleTicketConfiguration = () => {
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

  const handleModal = (emailTemplate: string) => {
    setIsModalVisible(true)
    setEmailTemplateModel(emailTemplate)
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
      templateType: '',
      assetType: '',
      assetTypeId: '',
      email: '',
      id: '',
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
              onClick={handleTicketConfiguration}
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
            <CButton color="info btn-ovh me-1" className="text-white">
              <i className="fa fa-plus me-1"></i>Add Template
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
              <CTableHeaderCell scope="col" className="w-25">
                Template
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employeeMailTemplates.map((emailTemplate, index) => {
              const descriptionLimit =
                emailTemplate.template && emailTemplate.template.length > 15
                  ? `${emailTemplate.template.substring(0, 15)}...`
                  : emailTemplate.template
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                  <CTableDataCell scope="row">
                    {emailTemplate.templateType}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {emailTemplate.templateName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {emailTemplate.assetType}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      onClick={() =>
                        handleModal(
                          emailTemplate.templateName && emailTemplate.template,
                        )
                      }
                    >
                      {parse(descriptionLimit)}
                    </CLink>
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
              )
            })}
            <OModal
              modalSize="lg"
              alignment="center"
              modalFooterClass="d-none"
              modalHeaderClass="d-none"
              visible={isModalVisible}
              setVisible={setIsModalVisible}
            >
              <div dangerouslySetInnerHTML={{ __html: emailTemplateModel }} />
            </OModal>
          </CTableBody>
        </CTable>
        <strong>
          {employeeMailTemplates?.length
            ? `Total Records: ${employeeMailTemplates?.length}`
            : `No Records found...`}
        </strong>
      </OCard>
    </>
  )
}
export default employeeEmailTemplate
