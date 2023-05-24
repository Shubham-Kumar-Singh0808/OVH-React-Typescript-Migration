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
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { ManufacturerDetails } from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { UserAccessToFeatures } from '../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const ManufacturerListTable = ({
  paginationRange,
  setPageSize,
  setCurrentPage,
  currentPage,
  pageSize,
  searchInput,
  setToggle,
  setEditManufacturerData,
  userAccess,
}: {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  currentPage: number
  pageSize: number
  searchInput: string
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditManufacturerData: React.Dispatch<
    React.SetStateAction<ManufacturerDetails>
  >
  userAccess: UserAccessToFeatures | undefined
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteLocationId, setDeleteLocationId] = useState(0)
  const [deleteLocationName, setDeleteLocationName] = useState('')

  const employees = useTypedSelector(
    reduxServices.ManufacturerList.selectors.manufacturerList,
  )
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const listSize = useTypedSelector(
    reduxServices.ManufacturerList.selectors.listSize,
  )
  console.log(listSize)
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const deleteBtnHandler = (id: number, name: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setDeleteLocationName(name)
  }

  const deletedToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Manufacturer Deleted Successfully"
    />
  )
  const deleteFailedToastMessage = (
    <OToast
      toastMessage="This manufacturer name is used in specifications,So you cannot delete"
      toastColor="danger"
      data-testid="failedToast"
    />
  )
  const confirmDeleteLocation = async () => {
    setIsDeleteModalVisible(false)
    const deleteLocationResult = await dispatch(
      reduxServices.ManufacturerList.deleteManufacturerName(deleteLocationId),
    )
    if (
      reduxServices.ManufacturerList.deleteManufacturerName.fulfilled.match(
        deleteLocationResult,
      )
    ) {
      dispatch(
        reduxServices.ManufacturerList.getManufacturerList({
          endIndex: pageSize * currentPage,
          manufacturerName: searchInput,
          startIndex: pageSize * (currentPage - 1),
          search: '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.ManufacturerList.deleteManufacturerName.rejected.match(
        deleteLocationResult,
      ) &&
      deleteLocationResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  const editBtnHandler = (manufacturer: ManufacturerDetails) => {
    console.log(manufacturer)
    setToggle('EditManufacturerList')
    setEditManufacturerData(manufacturer)
  }

  return (
    <>
      <>
        <CTable striped align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Manufacturer Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Product Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Updated by</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees?.length > 0 &&
              employees?.map((manufacturer, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row"></CTableHeaderCell>
                    <CTableHeaderCell>{getItemNumber(index)}</CTableHeaderCell>
                    <CTableDataCell>
                      {manufacturer.manufacturerName}
                    </CTableDataCell>
                    <CTableDataCell>{manufacturer.productName}</CTableDataCell>
                    <CTableDataCell>{manufacturer.createdBy}</CTableDataCell>
                    <CTableDataCell scope="row">
                      {userAccess?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            className="btn-ovh me-1 btn-ovh-employee-list"
                            data-testid="edit-family"
                            onClick={() => editBtnHandler(manufacturer)}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      )}

                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                          onClick={() =>
                            deleteBtnHandler(
                              manufacturer.manufacturerId,
                              manufacturer.manufacturerName,
                            )
                          }
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>

        <CRow>
          <CCol md={3} className="no-records">
            <strong>
              {listSize ? `Total Records: ${listSize}` : `No records found.`}
            </strong>
          </CCol>
          <CCol xs={3}>
            {listSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80, 100]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {listSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      </>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Manufacturer"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteLocation}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{deleteLocationName}</strong> manufacturer ?
        </>
      </OModal>
    </>
  )
}

export default ManufacturerListTable
