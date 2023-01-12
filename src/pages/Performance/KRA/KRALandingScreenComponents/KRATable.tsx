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

  const noRecords =
    kraData?.size !== 0
      ? `Total Records: ${kraData?.size}`
      : `No Records Found...`

  return (
    <>
      <CTable responsive striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
            <CTableHeaderCell scope="col">KRA Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Department</CTableHeaderCell>
            <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
            <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
            <CTableHeaderCell scope="col">No.of KPIs</CTableHeaderCell>
            <CTableHeaderCell scope="col" className="text-center">
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {kraData?.list.map((item, index) => (
            <KRATableItem
              key={index}
              isIconVisible={isIconVisible}
              setIsIconVisible={setIsIconVisible}
              selectedKRAId={selectedKRAId}
              setSelectedKRAId={setSelectedKRAId}
              selectedKRA={item}
              setModalDescription={setModalDescription}
              setModalVisible={setModalVisible}
              setDeleteThisKRA={setDeleteThisKRA}
            />
          ))}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol md={3} className="pull-left">
          <strong data-testid="record-number">{noRecords}</strong>
        </CCol>
        <CCol xs={3}>
          {kraData?.size > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {kraData?.size > 20 && (
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
        alignment="center"
        visible={isModalVisible}
        setVisible={setModalVisible}
        modalTitle="Delete KRA"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={deleteModalKRAButtonHandler}
      >
        <div
          data-testid="modal-cnt-kra-table"
          dangerouslySetInnerHTML={{ __html: modalDescription }}
        ></div>
      </OModal>
    </>
  )
}

export default KRATable
