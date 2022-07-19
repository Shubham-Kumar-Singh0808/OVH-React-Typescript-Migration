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
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import {
  EmployeeGetEmailTemplateModelProps,
  EmployeeEmailTemplateTableProps,
} from '../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeeEmailTemplateTable = ({
  employeeTemplate,
}: EmployeeEmailTemplateTableProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteTemplateId, setToDeleteTemplateId] = useState(0)

  const [emailTemplateModel, setEmailTemplateModel] =
    useState<EmployeeGetEmailTemplateModelProps>({
      emailTemplate: '',
      emailTemplateName: '',
    })

  const employeeMailTemplates = useTypedSelector(
    reduxServices.employeeMailConfiguration.selectors.employeeMailTemplate,
  )

  const dispatch = useAppDispatch()
  const handleModal = (emailTemplateName: string, emailTemplate: string) => {
    setIsModalVisible(true)
    setEmailTemplateModel({
      emailTemplate,
      emailTemplateName,
    })
  }

  const handleShowDeleteModal = (templateId: number) => {
    setToDeleteTemplateId(templateId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteEmailTemplateDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      reduxServices.employeeMailConfiguration.deleteMailTemplate(
        toDeleteTemplateId,
      ),
    )
    if (
      reduxServices.employeeMailConfiguration.deleteMailTemplate.fulfilled.match(
        deleteFamilyMemberResultAction,
      )
    ) {
      dispatch(
        reduxServices.employeeMailConfiguration.getEmployeeMailTemplate({
          templateName: employeeTemplate.templateName,
          templateTypeId: employeeTemplate.templateTypeId,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Email template deleted successfully"
          />,
        ),
      )
    }
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
                    <CButton
                      color="danger btn-ovh me-2"
                      data-testid={`btn-delete${index}`}
                      onClick={() => handleShowDeleteModal(emailTemplate.id)}
                    >
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
                <h4 className="model-text">
                  {emailTemplateModel.emailTemplateName}
                </h4>
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
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Template"
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteEmailTemplateDetails}
      >
        {`Do you really want to delete this Meeting Update Template?`}
      </OModal>
    </CTable>
  )
}
export default EmployeeEmailTemplateTable
