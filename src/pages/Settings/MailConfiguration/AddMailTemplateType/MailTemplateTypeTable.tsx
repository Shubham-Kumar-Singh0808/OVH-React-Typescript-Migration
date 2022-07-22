import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../../utils/paginationUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OToast from '../../../../components/ReusableComponent/OToast'

const MailTemplateTypeTable = (): JSX.Element => {
  const mailTemplateTypes = useTypedSelector(
    reduxServices.addNewmailTemplateType.selectors.mailTemplateType,
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

  const handleConfirmDeleteFamilyDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      reduxServices.addNewmailTemplateType.deleteMailTemplateType(
        toDeleteMailTemplateTypeId,
      ),
    )
    dispatch(reduxServices.category.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.category.actions.setPageSize(pageSize))
    if (
      reduxServices.addNewmailTemplateType.deleteMailTemplateType.fulfilled.match(
        deleteFamilyMemberResultAction,
      )
    ) {
      dispatch(reduxServices.addNewmailTemplateType.getMailTemplateTypes())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Family Detail deleted successfully"
          />,
        ),
      )
    }
  }

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-25">
              S.No
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-50">
              Template Type
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((category, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{category.name}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    size="sm"
                    data-testid={`category-delete-btn${index}`}
                    onClick={() => handleShowDeleteModal(category.id)}
                  >
                    <CIcon className="text-white" icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
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
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteFamilyDetails}
      >
        {`Do you really want to delete this ?`}
      </OModal>
    </>
  )
}
export default MailTemplateTypeTable
