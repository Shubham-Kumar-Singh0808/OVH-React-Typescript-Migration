import React, { useMemo, useState } from 'react'
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
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { currentPageData } from '../../../../utils/paginationUtils'
import { usePagination } from '../../../../middleware/hooks/usePagination'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'

const LocationListTable = ({
  userDeleteAccess,
}: {
  userDeleteAccess: boolean
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [deleteLocationId, setDeleteLocationId] = useState(0)
  const [deleteLocationName, setDeleteLocationName] = useState('')

  const dispatch = useAppDispatch()

  const locationNames = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )

  const deletedToastElement = (
    <OToast toastColor="success" toastMessage="Location Deleted Successfully" />
  )
  const deleteFailedToastMessage = (
    <OToast
      toastMessage="Rooms are assigned to this location, so you cannot delete this location"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const confirmDeleteLocation = async () => {
    setIsDeleteModalVisible(false)
    const deleteLocationResult = await dispatch(
      reduxServices.addLocationList.deleteLocation(deleteLocationId),
    )
    if (
      reduxServices.addLocationList.deleteLocation.fulfilled.match(
        deleteLocationResult,
      )
    ) {
      dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
      dispatch(reduxServices.app.actions.addToast(deletedToastElement))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.addLocationList.deleteLocation.rejected.match(
        deleteLocationResult,
      ) &&
      deleteLocationResult.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(deleteFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const deleteButtonHandler = (id: number, locationName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setDeleteLocationName(locationName)
  }

  const pageFromState = useTypedSelector(
    reduxServices.addLocationList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.addLocationList.selectors.pageSizeFromState,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(locationNames?.length, pageSizeFromState, pageFromState)

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
    () => currentPageData(locationNames, currentPage, pageSize),
    [locationNames, currentPage, pageSize],
  )

  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Location Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.length > 0 &&
            currentPageItems?.map((location, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{location.locationName}</CTableDataCell>
                  <CTableDataCell>
                    {userDeleteAccess && (
                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          color="danger btn-ovh me-1"
                          className="btn-ovh-employee-list"
                          onClick={() =>
                            deleteButtonHandler(
                              location.id,
                              location.locationName,
                            )
                          }
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {locationNames?.length
              ? `Total Records: ${locationNames?.length}`
              : `No Records Found`}
          </strong>
        </CCol>
        <CCol xs={3}>
          {locationNames?.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {locationNames?.length > 20 && (
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
        modalTitle="Delete Location"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteLocation}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{deleteLocationName}</strong> Location ?
        </>
      </OModal>
    </>
  )
}
export default LocationListTable
