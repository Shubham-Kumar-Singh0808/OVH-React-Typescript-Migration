import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EventTypeListTable from './EventTypeListTable'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextDanger } from '../../../../constant/ClassName'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const EventTypeList = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [eventType, setEventType] = useState<string>('')
  const [isEventNameExists, setIsEventNameExist] = useState<string>('')
  const [isAddBtnEnabled, setIsAddBtnEnabled] = useState<boolean>(false)
  const [editEventTypeName, setEditEventTypeName] = useState('')
  const [isEditBtnClicked, setIsEditBtnClicked] = useState(false)

  const eventTypeList = useTypedSelector(
    reduxServices.eventTypeList.selectors.eventTypeList,
  )

  const isLoading = useTypedSelector(
    reduxServices.eventTypeList.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(reduxServices.eventTypeList.getEventTypes())
  }, [dispatch])

  const eventNameExists = (name: string) => {
    return eventTypeList?.find((currEventType) => {
      return currEventType.name.toLowerCase() === name.toLowerCase()
    })
  }

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const newValue = value.replace(/[^a-z0-9\s]/gi, '').replace(/^\s*/, '')

    if (isEditBtnClicked) {
      setEditEventTypeName(newValue)
    } else {
      setEventType(newValue)
      if (eventNameExists(value)) {
        setIsEventNameExist(value)
      } else {
        setIsEventNameExist('')
      }
    }
  }

  useEffect(() => {
    if (eventType) {
      setIsAddBtnEnabled(true)
    } else {
      setIsAddBtnEnabled(false)
    }
  }, [eventType])

  const addEventTypeSuccessToast = (
    <OToast toastMessage="Event type added successfully" toastColor="success" />
  )

  const addEventTypeBtnHandler = async () => {
    const addEventTypeResultAction = await dispatch(
      reduxServices.eventTypeList.addEventType(eventType),
    )
    if (
      reduxServices.eventTypeList.addEventType.fulfilled.match(
        addEventTypeResultAction,
      )
    ) {
      setEventType('')
      await dispatch(reduxServices.eventTypeList.getEventTypes())
      dispatch(reduxServices.app.actions.addToast(addEventTypeSuccessToast))
    }
  }
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Event',
  )
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="EventType List"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={'/newEvent'}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            EventType:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              autoComplete="off"
              className="mb-2"
              data-testid="eventType"
              type="text"
              id="Name"
              size="sm"
              name="eventType"
              placeholder="Enter EventType"
              value={eventType}
              onChange={onChangeInputHandler}
            />
            {isEventNameExists && (
              <span
                className={TextDanger}
                data-testid="Location-name-already-exist"
              >
                <b>Event type already exist</b>
              </span>
            )}
          </CCol>
          <CCol sm={3}>
            {userAccess?.createaccess && (
              <CButton
                data-testid="addEventTypeBtn"
                color="info"
                className="btn-ovh me-1"
                onClick={addEventTypeBtnHandler}
                disabled={
                  isAddBtnEnabled
                    ? isAddBtnEnabled && isEventNameExists.length > 0
                    : !isAddBtnEnabled
                }
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            )}
          </CCol>
        </CRow>
      </CForm>
      {isLoading !== ApiLoadingState.loading ? (
        <EventTypeListTable
          onChangeInputHandler={onChangeInputHandler}
          editEventTypeName={editEventTypeName}
          setEditEventTypeName={setEditEventTypeName}
          isEditBtnClicked={isEditBtnClicked}
          setIsEditBtnClicked={setIsEditBtnClicked}
          userAccess={userAccess}
        />
      ) : (
        <>
          <OLoadingSpinner type={LoadingType.PAGE} />
        </>
      )}
    </OCard>
  )
}
export default EventTypeList
