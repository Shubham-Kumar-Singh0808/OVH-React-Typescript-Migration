import React, { useState } from 'react'
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

const LocationListTable = (): JSX.Element => {
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

  const confirmDeleteLocation = async () => {
    setIsDeleteModalVisible(false)
    await dispatch(
      reduxServices.addLocationList.deleteLocation(deleteLocationId),
    )

    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
    dispatch(reduxServices.app.actions.addToast(deletedToastElement))
  }

  const deleteButtonHandler = (id: number, locationName: string) => {
    setIsDeleteModalVisible(true)
    setDeleteLocationId(id)
    setDeleteLocationName(locationName)
  }

  return (
    <>
      <CCol className="custom-scroll">
        <CTable striped responsive className="mt-5">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Location Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {locationNames.length > 0 &&
              locationNames?.map((location, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{location.locationName}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Delete">
                        <CButton
                          data-testid={`btn-delete${index}`}
                          size="sm"
                          className="btn-ovh me-2 cursor-pointer"
                          color="danger btn-ovh me-2"
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
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </CCol>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {locationNames.length}</strong>
          </p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={confirmDeleteLocation}
      >
        {`Do you really want to delete this ${deleteLocationName} Location ?`}
      </OModal>
    </>
  )
}
export default LocationListTable
