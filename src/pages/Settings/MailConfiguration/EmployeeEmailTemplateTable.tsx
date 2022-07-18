import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import {
  EmployeeGetEmailTemplateModelProps,
  EmployeeEmailTemplateTableProps,
} from '../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'

const EmployeeEmailTemplateTable = ({
  employeeTemplate,
}: EmployeeEmailTemplateTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [emailTemplateModel, setEmailTemplateModel] =
    useState<EmployeeGetEmailTemplateModelProps>({
      emailTemplate: '',
      emailTemplateName: '',
    })
  const employeeMailTemplates = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplate,
  )
  const handleModal = (emailTemplateName: string, emailTemplate: string) => {
    setIsModalVisible(true)
    setEmailTemplateModel({
      emailTemplate,
      emailTemplateName,
    })
  }
  return (
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
      {employeeTemplate.templateTypeId || employeeTemplate.templateName ? (
        <>
          <CTableBody>
            {employeeMailTemplates?.map((emailTemplate, index) => {
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
                      data-testid="mail-link"
                      className="cursor-pointer text-decoration-none text-primary"
                      onClick={() =>
                        handleModal(
                          emailTemplate.templateName,
                          emailTemplate.template,
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
              <>
                <h5 className="model-text">
                  {emailTemplateModel.emailTemplateName}
                </h5>
                <div
                  dangerouslySetInnerHTML={{
                    __html: emailTemplateModel.emailTemplate,
                  }}
                />
              </>
            </OModal>
          </CTableBody>
          <br></br>
          <strong>
            {employeeMailTemplates?.length
              ? `Total Records: ${employeeMailTemplates?.length}`
              : `No Records found...`}
          </strong>
        </>
      ) : (
        <>
          <br></br>
          <strong>No Records found...</strong>
        </>
      )}
    </CTable>
  )
}
export default EmployeeEmailTemplateTable
