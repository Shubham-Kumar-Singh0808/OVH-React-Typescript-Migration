import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import KRATableItem from './KRATableItem'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { emptyString } from '../../../../constant/constantData'
import OModal from '../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { KRATableProps } from '../../../../types/Performance/KRA/KRATypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const KRATable = (props: KRATableProps): JSX.Element => {
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = props
  const dispatch = useAppDispatch()
  const currentQuery = useTypedSelector((state) => state.KRA.krasQuery)
  const kraData = useTypedSelector((state) => state.KRA.kraData)
  const [isIconVisible, setIsIconVisible] = useState<boolean>(false)

  const [selectedKRAId, setSelectedKRAId] = useState<number>(-1)
  const [isModalVisible, setModalVisible] = useState<boolean>(false)
  const [modalDescription, setModalDescription] = useState<string>(emptyString)
  const [showModalButtons, setShowModalButtons] = useState<boolean>(false)
  const [deleteThisKRA, setDeleteThisKRA] = useState<number>()

  const handlePageSizeSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(e.target.value))
    setCurrentPage(1)
  }

  const deleteModalKRAButtonHandler = async () => {
    if (deleteThisKRA) {
      const result = await dispatch(
        reduxServices.KRA.deleteKRAThunk(deleteThisKRA),
      )
      const successMessage = (
        <OToast toastColor="success" toastMessage="KRA Deleted Successfully" />
      )
      if (reduxServices.KRA.deleteKRAThunk.fulfilled.match(result)) {
        setModalVisible(false)
        dispatch(reduxServices.KRA.searchKRADataThunk(currentQuery))
        dispatch(reduxServices.app.actions.addToast(successMessage))
      }
    }
  }

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell></CTableHeaderCell>
            <CTableHeaderCell>KRA Name</CTableHeaderCell>
            <CTableHeaderCell>Description</CTableHeaderCell>
            <CTableHeaderCell>Department</CTableHeaderCell>
            <CTableHeaderCell>Designation</CTableHeaderCell>
            <CTableHeaderCell>Percentage</CTableHeaderCell>
            <CTableHeaderCell>No.of KPIs</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {kraData.list.map((item, index) => (
            <KRATableItem
              key={index}
              isIconVisible={isIconVisible}
              setIsIconVisible={setIsIconVisible}
              selectedKRAId={selectedKRAId}
              setSelectedKRAId={setSelectedKRAId}
              selectedKRA={item}
              setModalDescription={setModalDescription}
              setModalVisible={setModalVisible}
              setShowModalButtons={setShowModalButtons}
              setDeleteThisKRA={setDeleteThisKRA}
            />
          ))}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol md={3} className="pull-left">
          <strong data-testid="record-number">
            {kraData.size !== 0
              ? `Total Records: ${kraData.size}`
              : `No Records Found...`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {kraData.size > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {kraData.size > 20 && (
          <CCol
            xs={5}
            className="col-6 d-grid d-md-flex justify-content-md-end"
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
        visible={isModalVisible}
        setVisible={setModalVisible}
        modalSize="lg"
        alignment="center"
        modalFooterClass={showModalButtons ? '' : 'd-none'}
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={deleteModalKRAButtonHandler}
        modalHeaderClass="d-none"
      >
        <div dangerouslySetInnerHTML={{ __html: modalDescription }}></div>
      </OModal>
    </>
  )
}

export default KRATable
