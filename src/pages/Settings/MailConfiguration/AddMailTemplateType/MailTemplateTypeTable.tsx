import {
  CButton,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../../utils/paginationUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OToast from '../../../../components/ReusableComponent/OToast'
import { MailTemplateType } from '../../../../types/Settings/MailConfiguration/AddMailTemplateType/addTemplateType'

const MailTemplateTypeTable = (): JSX.Element => {
  const [isMailTemplateEdit, setIsMailTemplateEdit] = useState<boolean>(false)
  const initialMailTemplateType = {} as MailTemplateType
  const [editTemplateTypeDetails, setEditTemplateTypeDetails] = useState(
    initialMailTemplateType,
  )
  const [templateId, setTemplateId] = useState(0)
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)
  const mailTemplateTypes = useTypedSelector(
    reduxServices.addNewMailTemplateType.selectors.mailTemplateType,
  )

  const pageFromState = useTypedSelector(
    reduxServices.category.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.category.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(mailTemplateTypes.length, pageSizeFromState, pageFromState)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteMailTemplateTypeId, setToDeleteMailTemplateTypeId] =
    useState(0)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(reduxServices.addNewMailTemplateType.getMailTemplateTypes())
  }, [dispatch])

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(mailTemplateTypes, currentPage, pageSize),
    [mailTemplateTypes, currentPage, pageSize],
  )

  const handleShowDeleteModal = (id: number) => {
    setIsDeleteModalVisible(true)
    setToDeleteMailTemplateTypeId(id)
  }

  const handleConfirmDeleteMailTemplateType = async () => {
    setIsDeleteModalVisible(false)
    const deleteMailTemplateTypeResultAction = await dispatch(
      reduxServices.addNewMailTemplateType.deleteMailTemplateType(
        toDeleteMailTemplateTypeId,
      ),
    )
    dispatch(
      reduxServices.addNewMailTemplateType.actions.setCurrentPage(currentPage),
    )
    dispatch(reduxServices.addNewMailTemplateType.actions.setPageSize(pageSize))
    if (
      reduxServices.addNewMailTemplateType.deleteMailTemplateType.fulfilled.match(
        deleteMailTemplateTypeResultAction,
      )
    ) {
      dispatch(reduxServices.addNewMailTemplateType.getMailTemplateTypes())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Template Type deleted successfully"
          />,
        ),
      )
    }
  }

  const saveMailTemplateButtonHandler = async () => {
    const saveMailTemplateTypeResultAction = await dispatch(
      reduxServices.addNewMailTemplateType.updateMailTemplateType(
        editTemplateTypeDetails,
      ),
    )
    if (
      reduxServices.addNewMailTemplateType.updateMailTemplateType.fulfilled.match(
        saveMailTemplateTypeResultAction,
      )
    ) {
      dispatch(reduxServices.addNewMailTemplateType.getMailTemplateTypes())
      setIsMailTemplateEdit(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Template Type has been modified."
          />,
        ),
      )
    }
  }

  const editTemplateTypeButtonHandler = (id: number, name: string): void => {
    setIsMailTemplateEdit(true)
    setTemplateId(id)
    setEditTemplateTypeDetails({
      id,
      name,
    })
  }

  const handleEditMailTemplateHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target

    setEditTemplateTypeDetails((values) => {
      return { ...values, ...{ [name]: value } }
    })
  }

  const cancelMailTemplateTypeButtonHandler = () => {
    setIsMailTemplateEdit(false)
  }

  useEffect(() => {
    if (editTemplateTypeDetails?.name?.replace(/^\s*/, '')) {
      setIsSaveButtonEnabled(true)
    } else {
      setIsSaveButtonEnabled(false)
    }
  }, [editTemplateTypeDetails.name])

  return (
    <>
      <CTable striped className="mail-template-table">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Template Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((templateType, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">
                {getItemNumber(index)}
              </CTableHeaderCell>
              {isMailTemplateEdit && templateType.id === templateId ? (
                <CTableDataCell scope="row">
                  <div className="edit-time-control">
                    <CFormInput
                      type="text"
                      id="name"
                      data-testId="template-input"
                      name="name"
                      value={editTemplateTypeDetails.name}
                      onChange={handleEditMailTemplateHandler}
                      placeholder={'Template Type'}
                    />
                  </div>
                </CTableDataCell>
              ) : (
                <CTableDataCell scope="row">{templateType.name}</CTableDataCell>
              )}
              <CTableDataCell scope="row">
                {isMailTemplateEdit && templateType.id === templateId ? (
                  <>
                    <CButton
                      color="success"
                      data-testid={`sh-save-btn${index}`}
                      className="btn-ovh me-1"
                      disabled={!isSaveButtonEnabled}
                      onClick={saveMailTemplateButtonHandler}
                    >
                      <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </CButton>
                    <CTooltip content="Cancel">
                      <CButton
                        data-testid={`btn-remove${index}`}
                        color="warning"
                        className="btn-ovh me-1"
                        onClick={cancelMailTemplateTypeButtonHandler}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        onClick={() => handleShowDeleteModal(templateType.id)}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </>
                ) : (
                  <>
                    <CTooltip content="Edit">
                      <CButton
                        color="info"
                        data-testid={`sh-edit-btn${index}`}
                        className="btn-ovh me-1"
                        onClick={() => {
                          editTemplateTypeButtonHandler(
                            templateType.id,
                            templateType.name,
                          )
                        }}
                      >
                        <i
                          className="fa fa-pencil-square-o"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list"
                        onClick={() => handleShowDeleteModal(templateType.id)}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </>
                )}
              </CTableDataCell>

              <></>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {mailTemplateTypes?.length
              ? `Total Records: ${mailTemplateTypes.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {mailTemplateTypes.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {mailTemplateTypes.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        alignment="center"
        modalTitle="Delete TemplateType"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteMailTemplateType}
      >
        {`Do you really want to delete s Type ?`}
      </OModal>
    </>
  )
}
export default MailTemplateTypeTable
