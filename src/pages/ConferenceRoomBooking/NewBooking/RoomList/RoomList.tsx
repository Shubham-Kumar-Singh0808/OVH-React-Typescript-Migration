import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useState, useEffect } from 'react'
import RoomListTable from './RoomListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

const RoomList = (): JSX.Element => {
  const [filterByLocation, setFilterByLocation] = useState<string>('')
  const [filterByLocationId] = useState<number>(0)
  const [selectRoomName, setSelectRoomName] = useState('')
  const [isRoomNameExist, setIsRoomNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.roomLists.getAllMeetingRoomsData())
  }, [dispatch])

  const roomNameExists = (name: string) => {
    return roomList?.find((roomName) => {
      return roomName.roomName.toLowerCase() === name.toLowerCase()
    })
  }

  const successToast = (
    <OToast toastMessage="Room Added Successfully" toastColor="success" />
  )

  useEffect(() => {
    if (selectRoomName) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectRoomName])

  const addBtnHandler = async () => {
    const prepareObj = {
      roomName: selectRoomName,
      locationId: filterByLocationId,
    }
    const isAddRoom = await dispatch(
      reduxServices.roomLists.addRoom(prepareObj),
    )
    if (reduxServices.roomLists.addRoom.fulfilled.match(isAddRoom)) {
      dispatch(reduxServices.roomLists.getAllMeetingRoomsData())
      setSelectRoomName('')
      setFilterByLocation('')
      dispatch(reduxServices.app.actions.addToast(successToast))
    }
  }

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const newValue = value
        .replace(/[^_-a-zA-Z0-9\s]/gi, '')
        .replace(/^\s*/, '')
      setSelectRoomName(newValue)
    }
    if (roomNameExists(value)) {
      setIsRoomNameExist(value)
    } else {
      setIsRoomNameExist('')
    }
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Room List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {' '}
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">
              Location:{' '}
              <span className={filterByLocation ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="location"
              data-testid="form-select1"
              name="location"
              value={filterByLocation}
              onChange={(e) => {
                setFilterByLocation(e.target.value)
              }}
            >
              {roomList.map((location, index) => (
                <option key={index} value={location.locationId}>
                  {location.locationName}
                </option>
              ))}
              <option value={''}>Select Location</option>
            </CFormSelect>
          </CCol>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Name of the Room:
            <span className={selectRoomName ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="tracker-name"
              type="text"
              id="Name"
              size="sm"
              name="name"
              placeholder="Enter Name"
              value={selectRoomName}
              onChange={handledInputChange}
            />

            {isRoomNameExist && (
              <p className={TextDanger} data-testid="nameAlreadyExist">
                Name Already Exist
              </p>
            )}
          </CCol>
          <CCol sm={2}>
            <CButton
              data-testid="designationButton"
              color="info"
              className="btn-ovh me-1"
              disabled={
                isAddButtonEnabled
                  ? isAddButtonEnabled && isRoomNameExist.length > 0
                  : !isAddButtonEnabled
              }
              onClick={addBtnHandler}
            >
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        </CRow>
        <RoomListTable />
      </OCard>
    </>
  )
}
export default RoomList
