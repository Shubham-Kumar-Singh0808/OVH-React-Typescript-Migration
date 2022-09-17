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

const RoomList = (): JSX.Element => {
  const [filterByLocation, setFilterByLocation] = useState<string>('')
  const [isRoomName, setIsRoomName] = useState('')
  const [isRoomNameExist, setIsRoomNameExist] = useState('')
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

  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const newValue = value.replace(/[^a-zA-Z0-9\s]/gi, '').replace(/^\s*/, '')
      setIsRoomName(newValue)
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
              <option value={''}>Select Location</option>
            </CFormSelect>
          </CCol>
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Name of the Room:
            <span className={isRoomName ? 'text-white' : 'text-danger'}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="tracker-name"
              type="text"
              id="Name"
              size="sm"
              name="name"
              placeholder="Enter Name"
              value={isRoomName}
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
