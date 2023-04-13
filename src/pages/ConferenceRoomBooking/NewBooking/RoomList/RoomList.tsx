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

const RoomList = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectLocationId, setSelectLocationId] = useState<string>('')
  const [selectRoomName, setSelectRoomName] = useState('')

  const [roomNameExist, setRoomNameExist] = useState('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  const dispatch = useAppDispatch()

  const roomList = useTypedSelector(reduxServices.roomLists.selectors.roomNames)
  const locationList = useTypedSelector(
    reduxServices.addLocationList.selectors.locationNames,
  )

  useEffect(() => {
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
  }, [dispatch])

  useEffect(() => {
    if (selectLocationId) {
      dispatch(
        reduxServices.roomLists.getRoomsOfLocation(Number(selectLocationId)),
      )
    }
  }, [selectLocationId, dispatch])

  useEffect(() => {
    if (selectLocationId === '') {
      dispatch(reduxServices.roomLists.getMeetingRooms())
    }
  }, [selectLocationId, dispatch])

  const roomNameExists = (name: string) => {
    return roomList?.find((roomName) => {
      return roomName.roomName.toLowerCase() === name.toLowerCase()
    })
  }

  const successToast = (
    <OToast toastMessage="Room Added Successfully" toastColor="success" />
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Meeting-Rooms',
  )

  useEffect(() => {
    if (selectRoomName && selectLocationId) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [selectRoomName, selectLocationId])

  const addBtnHandler = async () => {
    const prepareObj = {
      roomName: selectRoomName,
      locationId: Number(selectLocationId),
    }
    await dispatch(reduxServices.roomLists.addRoom(prepareObj))

    setSelectRoomName('')
    dispatch(
      reduxServices.roomLists.getRoomsOfLocation(Number(selectLocationId)),
    )
    dispatch(reduxServices.app.actions.addToast(successToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
  }
  const handleEnterKeyWord = async (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (isAddButtonEnabled && event.key === 'Enter' && !roomNameExist) {
      const prepareObj = {
        roomName: selectRoomName,
        locationId: Number(selectLocationId),
      }
      await dispatch(reduxServices.roomLists.addRoom(prepareObj))

      setSelectRoomName('')
      dispatch(
        reduxServices.roomLists.getRoomsOfLocation(Number(selectLocationId)),
      )
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'roomName') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setSelectRoomName(newValue)
    }
    if (roomNameExists(value.trim())) {
      setRoomNameExist(value.trim())
    } else {
      setRoomNameExist('')
    }
  }
  const clearInputs = () => {
    setSelectRoomName('')
    setSelectLocationId('')
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
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CRow className="mb-3 mt-3">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">
              Location:{' '}
              <span className={selectLocationId ? TextWhite : TextDanger}>
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
              value={selectLocationId}
              onChange={(e) => {
                setSelectLocationId(e.target.value)
              }}
            >
              <option value={''}>Select Location</option>
              {locationList.length > 0 &&
                locationList?.map((location, index) => (
                  <option key={index} value={location.id}>
                    {location.locationName}
                  </option>
                ))}
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
              className="mb-2"
              data-testid="roomName"
              type="text"
              id="roomName"
              size="sm"
              name="roomName"
              autoComplete="off"
              placeholder="Enter Room Name"
              value={selectRoomName}
              onChange={handledInputChange}
              onKeyDown={handleEnterKeyWord}
              maxLength={30}
            />
            {roomNameExist && (
              <span className={TextDanger} data-testid="nameAlreadyExist">
                <b>Room name already exist</b>
              </span>
            )}
          </CCol>
          <CCol sm={2}>
            {userAccess?.createaccess && (
              <CButton
                data-testid="designationButton"
                color="info"
                className="btn-ovh me-1"
                disabled={
                  isAddButtonEnabled
                    ? isAddButtonEnabled && roomNameExist.length > 0
                    : !isAddButtonEnabled
                }
                onClick={addBtnHandler}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            )}
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              onClick={clearInputs}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
        <RoomListTable
          selectLocationId={selectLocationId}
          userDeleteAccess={userAccess?.deleteaccess as boolean}
        />
      </OCard>
    </>
  )
}
export default RoomList
