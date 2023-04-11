import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTooltip,
  CButton,
  CRow,
  CCol,
  CFormInput,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { UserAccessToFeatures } from '../../../../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

const EventTypeListTable = ({
  onChangeInputHandler,
  editEventTypeName,
  setEditEventTypeName,
  isEditBtnClicked,
  setIsEditBtnClicked,
  userAccess,
}: {
  onChangeInputHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  editEventTypeName: string
  setEditEventTypeName: (value: string) => void
  isEditBtnClicked: boolean
  setIsEditBtnClicked: (value: boolean) => void
  userAccess: UserAccessToFeatures | undefined
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const eventTypeList = useTypedSelector(
    reduxServices.eventTypeList.selectors.eventTypeList,
  )

  const [isEventTypeDelModal, setIsEventTypeDelModal] = useState<boolean>(false)
  const [selectEventTypeId, setSelectEventTypeId] = useState(0)
  const [selectEventTypeName, setSelectEventTypeName] = useState('')

  const deleteBtnHandler = (id: number, name: string) => {
    setIsEventTypeDelModal(true)
    setSelectEventTypeId(id)
    setSelectEventTypeName(name)
  }

  const editBtnHandler = (id: number, name: string) => {
    setIsEditBtnClicked(true)
    setSelectEventTypeId(id)
    setEditEventTypeName(name)
  }

  const cancelBtnHandler = () => {
    setIsEditBtnClicked(false)
  }

  const deletedEventTypeToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Event type deleted successfully"
    />
  )

  const updateEventTypeToastElement = (
    <OToast
      toastColor="success"
      toastMessage="Event type updated successfully"
    />
  )

  const eventTypeAlreadyExistsToast = (
    <OToast toastMessage="Event type is already exist" toastColor="danger" />
  )

  const confirmDeleteEventType = async () => {
    setIsEventTypeDelModal(false)
    await dispatch(
      reduxServices.eventTypeList.deleteEventType(selectEventTypeId),
    )
    await dispatch(reduxServices.eventTypeList.getEventTypes())
    dispatch(reduxServices.app.actions.addToast(deletedEventTypeToastElement))
  }

  const saveBtnHandler = async () => {
    const isEventExists = eventTypeList?.find(
      (currEventType) =>
        currEventType.name.toLowerCase() === editEventTypeName.toLowerCase(),
    )

    if (isEventExists) {
      dispatch(reduxServices.app.actions.addToast(eventTypeAlreadyExistsToast))
      setIsEditBtnClicked(false)
    } else {
      await dispatch(
        reduxServices.eventTypeList.updateEventType({
          id: selectEventTypeId,
          name: editEventTypeName,
        }),
      )
      await dispatch(reduxServices.eventTypeList.getEventTypes())
      setIsEditBtnClicked(false)
      dispatch(reduxServices.app.actions.addToast(updateEventTypeToastElement))
    }
  }

  return (
    <>
      <CCol className="custom-scroll">
        <CTable striped responsive className="mt-1">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell className="ps-1">EventType</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {eventTypeList.length > 0 &&
              eventTypeList?.map((currEventType, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    {isEditBtnClicked &&
                    currEventType.id === selectEventTypeId ? (
                      <CTableDataCell scope="row">
                        <CCol sm={5}>
                          <CFormInput
                            className="eventType-editInput"
                            data-testid="eventTypeName"
                            type="text"
                            id="eventTypeName"
                            size="sm"
                            name="eventTypeName"
                            value={editEventTypeName}
                            onChange={onChangeInputHandler}
                          />
                        </CCol>
                      </CTableDataCell>
                    ) : (
                      <CTableDataCell>{currEventType.name}</CTableDataCell>
                    )}

                    <CTableDataCell>
                      {isEditBtnClicked &&
                      currEventType.id === selectEventTypeId ? (
                        <>
                          <CTooltip content="Save">
                            <CButton
                              data-testid={`save-btn${index}`}
                              size="sm"
                              className="btn btn-success btn-sm btn-ovh-employee-list cursor-pointer"
                              color="success btn-ovh me-2"
                              onClick={saveBtnHandler}
                            >
                              <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                          <CTooltip content="Cancel">
                            <CButton
                              data-testid={`cancel-btn${index}`}
                              size="sm"
                              className="btn btn-danger btn-sm btn-ovh-employee-list cursor-pointer"
                              color="danger btn-ovh me-2"
                              onClick={cancelBtnHandler}
                            >
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </CButton>
                          </CTooltip>
                        </>
                      ) : (
                        <CTooltip content="Edit">
                          <>
                            {userAccess?.updateaccess && (
                              <CButton
                                data-testid={`edit-btn${index}`}
                                size="sm"
                                className="btn btn-info btn-sm btn-ovh-employee-list cursor-pointer"
                                color="info btn-ovh me-1"
                                onClick={() =>
                                  editBtnHandler(
                                    currEventType.id,
                                    currEventType.name,
                                  )
                                }
                              >
                                <i
                                  className="fa fa-edit"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            )}
                          </>
                        </CTooltip>
                      )}
                      {userAccess?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            data-testid={`delete-btn${index}`}
                            size="sm"
                            className="btn btn-danger btn-sm btn-ovh-employee-list cursor-pointer"
                            color="danger btn-ovh me-2"
                            onClick={() =>
                              deleteBtnHandler(
                                currEventType.id,
                                currEventType.name,
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
      </CCol>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {eventTypeList.length}</strong>
          </p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={isEventTypeDelModal}
        setVisible={setIsEventTypeDelModal}
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={confirmDeleteEventType}
        modalBodyClass="mt-0"
        modalTitle="Delete EventType"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{selectEventTypeName}</strong> Event Type?
        </>
      </OModal>
    </>
  )
}

export default EventTypeListTable
